/* istanbul ignore file */
// this module is just some example code to play with the client

import { ICommandResult } from '@kadena/chainweb-node-client';
import { ICommand } from '@kadena/types';

import { getClient } from '../client/client';
import {
  addSigner,
  commandBuilder,
  ICapabilityItem,
  IPactCommand,
  payload,
  setMeta,
  setProp,
} from '../index';
import { getModule, Pact } from '../pact';

const { coin } = Pact.modules;

interface IAdminCapability {
  (name: 'test.ADMIN'): ICapabilityItem;
}

interface ITest {
  changeAdmin: (
    from: string,
    to: string,
  ) => string & {
    capability: IAdminCapability;
  };
}

const test: ITest = getModule('coin');

const nonce = (
  tag: string,
): {
  nonce: string;
} => {
  return { nonce: `${tag}:${Date.now()}` };
};

// use the payload type in the output cont/exec
// eslint-disable-next-line @rushstack/typedef-var
export const cmd = commandBuilder(
  payload.exec(
    coin.transfer('javad', 'albert', { decimal: '0.1' }),
    test.changeAdmin('albert', 'javad'),
  ),
  addSigner('javadPublicKey', (withCapability) => [
    //
    withCapability('coin.GAS'),
    withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
  ]),
  addSigner('albertPublicKey', (withCapability) => [
    //
    withCapability('test.ADMIN'),
  ]),
  setMeta({ chainId: '1' }),
  nonce('k:nonce'),
  setProp('networkId', 'mainnet04'),
);
// eslint-disable-next-line @rushstack/typedef-var
export const cmd2 = commandBuilder(
  payload.cont({}),
  addSigner('javadPublicKey', (withCapability) => [
    //
    withCapability('coin.GAS'),
    withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
  ]),
  addSigner('albertPublicKey', (withCapability) => [
    //
    withCapability('test.ADMIN'),
  ]),
  setMeta({ chainId: '1' }),
  nonce('kms'),
  setProp('networkId', 'mainnet04'),
);

const commandWithSignatures: ICommand = {
  cmd: JSON.stringify(cmd),
  hash: 'str',
  sigs: [{ sig: '' }],
};

const getHostUrl = (networkId: string, chainId: string): string => {
  switch (networkId) {
    case 'devnet':
      return `http://localhost/${chainId}/pact`;
    case 'l2network':
      return `http://the-l2-server/${chainId}/pact`;
    case 'mainnet01':
      return `https://api.chainweb.com/chainweb/0.0/mainnet01/chain/${chainId}/pact`;
    case 'testnet04':
      return `https://api.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`;
    default:
      throw new Error(`UNKNOWN_NETWORK_ID: ${networkId}`);
  }
};

const { local, submit, pollStatus, pollSpv: pollSpv } = getClient(getHostUrl);

export async function localExample(): Promise<ICommandResult> {
  const result = await local(commandWithSignatures);
  return result;
}

export async function submitExample(): Promise<Record<string, ICommandResult>> {
  const [requestKeys] = await submit([commandWithSignatures]);
  console.log(requestKeys);
  const result = await pollStatus(requestKeys, {
    onPoll: (requestKey) => {
      console.log('polling status of', requestKey);
    },
  });

  return result;
}

export async function pollRequestsAndWaitForEachPromiseExample(): Promise<void> {
  const someRequestKeys = ['key1', 'key2'];
  const results = pollStatus(someRequestKeys, {
    networkId: 'testnet04',
    chainId: '01',
    onPoll: (requestKey) => {
      console.log('polling status of', requestKey);
    },
  });

  Object.entries(results.requests).map(([requestKey, promise]) =>
    promise
      .then((data) => {
        console.log('the request ', requestKey, 'result:', data);
      })
      .catch((error) => {
        console.log(
          'error while getting the status of ',
          requestKey,
          'error:',
          error,
        );
      }),
  );
}

export async function spvExample(): Promise<string> {
  const someRequestKeys = 'key1';
  const status = await pollSpv(someRequestKeys, '01', {
    networkId: 'testnet04',
    chainId: '01',
  });
  return status;
}

export function composeCommands(): Partial<IPactCommand> {
  const mainnetConfig = commandBuilder(
    setMeta({ chainId: '1' }),
    setProp('networkId', 'mainnet04'),
  );

  const transfer = commandBuilder(
    payload.exec(coin.transfer('javad', 'albert', { decimal: '0.1' })),
    addSigner('javadPublicKey', (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
    ]),
  );

  return commandBuilder(mainnetConfig, transfer).getPactCommand();
}
