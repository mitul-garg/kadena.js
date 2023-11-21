import type { ChainId } from '@kadena/client';
import { Pact } from '@kadena/client';
import { execution } from '@kadena/client/fp';

import { dirtyReadClient } from '../core/client-helpers';
import type { IClientConfig } from '../core/utils/helpers';

import { pipe } from 'ramda';

/**
 * @alpha
 */
export const getBalance = (
  account: string,
  networkId: string,
  chainId: ChainId,
  host?: IClientConfig['host'],
  module: string = 'coin',
) => {
  const balance = pipe(
    (name) => Pact.modules[module as 'fungible-v2']['get-balance'](name),
    execution,
    dirtyReadClient({
      host,
      defaults: {
        networkId,
        meta: { chainId },
      },
    }),
  );
  return balance(account).execute();
};
