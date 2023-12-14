import chalk from 'chalk';
import type { Command } from 'commander';
import debug from 'debug';

import type { EncryptedString } from '@kadena/hd-wallet';
import { kadenaDecrypt, kadenaEncrypt } from '@kadena/hd-wallet';
import { kadenaChangePassword } from '@kadena/hd-wallet/chainweaver';

import { createExternalPrompt } from '../../prompts/generic.js';
import { actionAskForUpdatePassword } from '../../prompts/genericActionPrompts.js';
import { createCommand } from '../../utils/createCommand.js';
import { removeAfterFirstDot } from '../../utils/filesystem.js';
import { globalOptions } from '../../utils/globalOptions.js';
import { clearCLI } from '../../utils/helpers.js';
import * as storageService from '../utils/storage.js';

export const createChangeWalletPasswordCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'change-wallet-password',
  'update the password for your wallet',
  [
    globalOptions.keyWalletSelect(),
    globalOptions.securityCurrentPassword(),
    globalOptions.securityNewPassword(),
  ],
  async (config) => {
    try {
      clearCLI();
      debug('manage-keys:action')({ config });
      const { wallet: keyWallet, fileName } = config.keyWallet;

      console.log(
        chalk.yellow(
          `\nYou are about to update the password for this wallet.\n`,
        ),
      );

      const isLegacy =
        kadenaDecrypt(config.securityCurrentPassword, keyWallet).byteLength >=
        128;

      const externalPrompt = createExternalPrompt({
        actionAskForUpdatePassword,
      });
      const result = await externalPrompt.actionAskForUpdatePassword();

      if (result === 'no') {
        console.log(
          chalk.red(`\nWallet password won't be updated. Exiting..\n`),
        );
        process.exit(0);
      }

      let encryptedNewSeed: EncryptedString | undefined;

      if (isLegacy === true) {
        encryptedNewSeed = await kadenaChangePassword(
          keyWallet,
          config.securityCurrentPassword,
          config.securityNewPassword,
        );
      } else {
        const decryptedCurrentSeed = kadenaDecrypt(
          config.securityCurrentPassword,
          keyWallet,
        );
        encryptedNewSeed = kadenaEncrypt(
          config.securityNewPassword,
          decryptedCurrentSeed,
        );
      }

      console.log(chalk.green(`\nWallet password successfully updated..\n`));
      console.log('filename: ', fileName);
      storageService.storeWallet(
        encryptedNewSeed,
        removeAfterFirstDot(fileName),
        isLegacy,
      );
    } catch (error) {
      console.log(chalk.red(`\n${error.message}\n`));
      process.exit(1);
    }
  },
);
