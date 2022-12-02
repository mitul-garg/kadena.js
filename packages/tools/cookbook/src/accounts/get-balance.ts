import { Pact } from '@kadena/client';

import { apiHost } from '../utils';

const HELP: string = `Usage example: \n\nts-node create-account.js k:{accountPublicKey}`;

if (process.argv.length !== 3) {
  console.info(HELP);
  process.exit(1);
}

const [account] = process.argv.slice(2);

/**
 * Get KDA account balance
 *
 * @param {string} account
 * @return {Promise<void>}
 */
async function getBalance(account: string): Promise<void> {
  const response = await Pact.modules.coin['get-balance'](account).local(
    apiHost(),
  );

  console.log(response);
}

getBalance(account).catch(console.error);
