import { createChangeWalletPasswordCommand } from './commands/walletsChangeWalletPassword.js';
import { createGenerateHdKeysCommand } from './commands/walletsHdGenerate.js';
import { createImportWalletCommand } from './commands/walletsImportWallet.js';
import { createGenerateWalletCommand } from './commands/walletsWalletGenerate.js';

import type { Command } from 'commander';

const SUBCOMMAND_ROOT: 'wallets' = 'wallets';

export function walletsCommandFactory(program: Command, version: string): void {
  const walletsProgram = program
    .command(SUBCOMMAND_ROOT)
    .description(`Tool to generate and manage wallets`);
  createGenerateWalletCommand(walletsProgram, version);
  createImportWalletCommand(walletsProgram, version);
  createGenerateHdKeysCommand(walletsProgram, version);
  createChangeWalletPasswordCommand(walletsProgram, version);
}