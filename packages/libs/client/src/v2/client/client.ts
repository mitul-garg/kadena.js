import { ICommandResult, IPollResponse } from '@kadena/chainweb-node-client';
import { hash as blakeHash } from '@kadena/cryptography-utils';

import { ICommand } from '../pact';

import { ILocalOptions, local, LocalResponse } from './api/local';
import { getSpv, pollSpv } from './api/spv';
import { getStatus, pollStatus } from './api/status';
import { submit } from './api/submit';
import { getRequestStorage } from './utils/request-storege';
import {
  ICommandRequestWithoutHash,
  INetworkOptions,
  IPollOptions,
  IPollRequestPromise,
  kadenaHostGenerator,
  mergeAll,
  mergeAllPollRequestPromises,
} from './utils/utils';

type IOptions = IPollOptions &
  (INetworkOptions | { networkId?: undefined; chainId?: undefined });

interface IClient {
  /**
   * calls '/local' endpoint
   */
  local: <T extends ILocalOptions>(
    command: ICommandRequestWithoutHash,
    options?: T,
  ) => Promise<LocalResponse<T>>;
  /**
   * calls '/send' endpoint
   */
  submit: (
    commandsList: ICommandRequestWithoutHash[] | ICommandRequestWithoutHash,
  ) => Promise<
    [
      requestKeys: string[],
      pollStatus: (
        options?: IPollOptions,
      ) => IPollRequestPromise<ICommandResult>,
    ]
  >;
  /**
   * calls '/poll' endpoint several times to get the status of all requests. if the requests submitted outside of the current client context then you need to path networkId
   * and chianId as the option in order to generate correct hostApi address if you passed hostApiGenerator function while initiating the client instance
   */
  pollStatus: (
    requestKeys?: string[] | string,
    options?: IOptions,
  ) => IPollRequestPromise<ICommandResult>;

  /**
   * calls '/poll' endpoint only once. if the requests submitted outside of the current client context then you need to path networkId
   * and chianId as the option in order to generate correct hostApi address if you passed hostApiGenerator function while initiating the client instance
   */
  getStatus: (
    requestKeys?: string[] | string,
    options?: INetworkOptions,
  ) => Promise<IPollResponse>;
  /**
   * calls '/spv' endpoint several times to get the SPV proof. if the request submitted outside of the current client context then you need to path networkId
   * and chianId as the option in order to generate correct hostApi address if you passed hostApiGenerator function while initiating the client instance
   */
  pollSpv: (
    requestKey: string,
    targetChainId: string,
    options?: IOptions,
  ) => Promise<string>;

  /**
   * calls '/spv' endpoint only once. if the request submitted outside of the current client context then you need to path networkId
   * and chianId as the option in order to generate correct hostApi address if you passed hostApiGenerator function while initiating the client instance
   */
  getSpv: (
    requestKey: string,
    targetChainId: string,
    options?: INetworkOptions,
  ) => Promise<string>;
}

interface IGetClient {
  /**
   * path the url of the host if you only use one host
   */
  (hostUrl: string): IClient;
  /**
   * path a function that let you decide about with host url you should be picked for each request based on networkId and chianId
   * the default value returns kadena testnet or mainnet url based on networkId
   */
  (
    hostAddressGenerator?: (networkId: string, chainId: string) => string,
  ): IClient;
}

export const getClient: IGetClient = (host = kadenaHostGenerator): IClient => {
  const getHost = typeof host === 'string' ? () => host : host;
  const storage = getRequestStorage();

  function groupByHost(requestKeys?: string[], options?: IOptions) {
    let requestStorage = storage;
    if (requestKeys !== undefined) {
      const map = new Map<string, string>(
        requestKeys.map((requestKey) => [
          requestKey,
          storage.get(requestKey) ??
            getHost(options?.networkId!, options?.chainId!),
        ]),
      );
      requestStorage = getRequestStorage(map);
    }
    return requestStorage.groupByHost();
  }
  function pollStatusFunction(
    requestKeys?: string[] | string,
    options?: IOptions,
  ) {
    const results = groupByHost(
      typeof requestKeys === 'string' ? [requestKeys] : requestKeys,
      options,
    ).map(([hostUrl, requestKeys]) =>
      pollStatus(hostUrl, requestKeys, options),
    );

    // merge all of the result in one object
    const mergedPollRequestPromises = mergeAllPollRequestPromises(results);

    // remove from the pending requests storage
    Object.entries(mergedPollRequestPromises.requests).forEach(
      ([key, promise]) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.then(() => {
          storage.remove([key]);
        });
      },
    );

    return mergedPollRequestPromises;
  }

  const client: IClient = {
    local: (body, options) => {
      const cmd: ICommand = JSON.parse(body.cmd);
      const hostUrl = getHost(cmd.networkId, cmd.meta.chainId);
      return local(hostUrl, { ...body, hash: blakeHash(body.cmd) }, options);
    },
    submit: async (body) => {
      const commands = Array.isArray(body) ? body : [body];
      const [first] = commands;
      if (first === undefined) {
        throw new Error('EMPTY_COMMAND_LIST');
      }
      const cmd: ICommand = JSON.parse(first.cmd);
      const hostUrl = getHost(cmd.networkId, cmd.meta.chainId);
      const commandsWithHash = commands.map((req) => ({
        ...req,
        hash: blakeHash(req.cmd),
      }));
      const requestIds = await submit(hostUrl, commandsWithHash);
      storage.add(hostUrl, requestIds);

      return [
        requestIds,
        (options?: IPollOptions) =>
          pollStatusFunction(requestIds, {
            ...options,
            networkId: cmd.networkId,
            chainId: cmd.meta.chainId,
          }),
      ];
    },
    pollStatus: pollStatusFunction,
    getStatus: async (requestKeys, options) => {
      const keys =
        typeof requestKeys === 'string' ? [requestKeys] : requestKeys;

      const results = await Promise.all(
        groupByHost(keys, options).map(([hostUrl, requestKeys]) =>
          getStatus(hostUrl, requestKeys).catch(() => ({} as IPollResponse)),
        ),
      );

      // merge all of the result in one object
      const mergedResults = mergeAll(results);
      const receivedKeys = Object.keys(mergedResults);
      // remove from the pending requests storage
      storage.remove(receivedKeys);

      return mergedResults;
    },

    pollSpv: (requestKey, targetChainId, options) => {
      return pollSpv(
        storage.get(requestKey) ??
          getHost(options?.networkId!, options?.chainId!),
        requestKey,
        targetChainId,
        options,
      );
    },
    getSpv: (requestKey, targetChainId, options) => {
      return getSpv(
        storage.get(requestKey) ??
          getHost(options?.networkId!, options?.chainId!),
        requestKey,
        targetChainId,
      );
    },
  };

  return client;
};
