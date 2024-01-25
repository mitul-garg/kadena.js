import chalk from 'chalk';
import type { Command } from 'commander';
import debug from 'debug';

import type { CommandResult } from '../../utils/command.util.js';
import { assertCommandError } from '../../utils/command.util.js';
import { globalOptions } from '../../utils/globalOptions.js';

import {
  assessTransactionSigningStatus,
  getTransactionFromFile,
  signTransactionWithKeyPair,
} from '../utils/helpers.js';
import { saveSignedTransaction } from '../utils/storage.js';

import type { ICommand, IUnsignedCommand } from '@kadena/types';
import type { IKeyPair } from '../../keys/utils/storage.js';
import { createCommandFlexible } from '../../utils/createCommandFlexible.js';

export const signActionPlain = async (
  unsignedCommand: IUnsignedCommand,
  keyPairs: IKeyPair[],
  legacy?: boolean,
): Promise<CommandResult<ICommand>> => {
  try {
    const command = await signTransactionWithKeyPair(
      keyPairs,
      unsignedCommand,
      legacy,
    );

    return assessTransactionSigningStatus(command);
  } catch (error) {
    return {
      success: false,
      errors: [`Error in signAction: ${error.message}`],
    };
  }
};

/**
 * Creates a command for signing a Kadena transaction.
 *
 * @param {Command} program - The commander program.
 * @param {string} version - The version of the command.
 */
export const createSignTransactionWithKeypairCommand: (
  program: Command,
  version: string,
) => void = createCommandFlexible(
  'sign-with-keypair',
  'Sign a transaction using a keypair.',
  [
    globalOptions.keyPairs(),
    globalOptions.txTransactionDir({ isOptional: true }),
    globalOptions.txUnsignedTransactionFile(),
    globalOptions.legacy({ isOptional: true, disableQuestion: true }),
  ],
  async (option) => {
    try {
      const key = await option.keyPairs();
      const dir = await option.txTransactionDir();
      const file = await option.txUnsignedTransactionFile({
        signed: false,
        path: dir.txTransactionDir,
      });
      const mode = await option.legacy();

      debug.log('create-transaction:action', {
        ...key,
        ...dir,
        ...file,
        ...mode,
      });

      const txUnsignedTransaction = await getTransactionFromFile(
        file.txUnsignedTransactionFile,
        false,
        dir.txTransactionDir,
      );

      const result = await signActionPlain(
        txUnsignedTransaction,
        key.keyPairs,
        mode.legacy,
      );

      assertCommandError(result);

      await saveSignedTransaction(
        result.data,
        file.txUnsignedTransactionFile,
        dir.txTransactionDir,
      );

      console.log(chalk.green(`\nTransaction withinsigned successfully.\n`));
    } catch (error) {
      console.error(chalk.red(`\nAn error occurred: ${error.message}\n`));
      process.exit(1);
    }
  },
);
