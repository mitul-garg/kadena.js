import { Option, program } from 'commander';
import { z } from 'zod';
import {
  account,
  devnet as devnetPrompts,
  generic,
  genericActionsPrompts,
  keys,
  networks,
  security,
  tx,
  typescript,
  wallets,
} from '../prompts/index.js';

import type { ChainId } from '@kadena/types';
import { join } from 'node:path';

import {
  chainIdValidation,
  formatZodFieldErrors,
} from '../account/utils/accountHelpers.js';
import { KEY_EXT, WALLET_EXT } from '../constants/config.js';
import { loadDevnetConfig } from '../devnet/utils/devnetHelpers.js';
import {
  getWallet,
  parseKeyIndexOrRange,
  parseKeyPairsInput,
} from '../keys/utils/keysHelpers.js';
import { readKeyFileContent } from '../keys/utils/storage.js';
import { loadNetworkConfig } from '../networks/utils/networkHelpers.js';
import { createExternalPrompt } from '../prompts/generic.js';
import { createOption } from './createOption.js';
import {
  ensureDevnetsConfiguration,
  isNotEmptyString,
  passwordPromptTransform,
} from './helpers.js';
import { log } from './logger.js';

// eslint-disable-next-line @rushstack/typedef-var
export const globalFlags = {
  quiet: new Option(
    '-q --quiet',
    'Disables interactive prompts and skips confirmations',
  ),
  legacy: new Option('-l, --legacy', 'Output legacy format'),
} as const;

// eslint-disable-next-line @rushstack/typedef-var
export const globalOptions = {
  publicKeys: createOption({
    key: 'publicKeys' as const,
    prompt: account.publicKeysPrompt,
    validation: z.string(),
    option: new Option(
      '-p, --public-keys <publicKeys>',
      'Public keys (comma separated)',
    ),
    expand: async (publicKeys: string) => {
      return publicKeys
        ?.split(',')
        .map((value) => value.trim())
        .filter((key) => !!key);
    },
  }),
  fungible: createOption({
    key: 'fungible' as const,
    prompt: account.fungiblePrompt,
    validation: z.string(),
    option: new Option('-f, --fungible <fungible>', 'Fungible'),
  }),
  predicate: createOption({
    key: 'predicate' as const,
    prompt: account.predicatePrompt,
    validation: z.string(),
    option: new Option('-p, --predicate <predicate>', 'Keyset predicate'),
  }),
  // global
  quiet: createOption({
    key: 'quiet' as const,
    // quiet is never prompted
    prompt: () => false,
    validation: z.boolean().optional(),
    option: globalFlags.quiet,
  }),
  legacy: createOption({
    key: 'legacy' as const,
    prompt: ({ legacy }): boolean => {
      return legacy === true || legacy === 'true' || false;
    },
    validation: z.boolean().optional(),
    option: globalFlags.legacy,
  }),
  // security
  passwordFile: createOption({
    key: 'passwordFile' as const,
    prompt: security.passwordFilePrompt,
    validation: z.string().or(z.object({ _password: z.string() })),
    option: new Option(
      '--password-file <passwordFile>',
      'Filepath to the password file',
    ),
    transform: passwordPromptTransform('--password-file'),
  }),
  passwordFileRepeat: createOption({
    key: 'passwordFileRepeat' as const,
    prompt: security.passwordFileRepeatPrompt,
    validation: z.string().or(z.object({ _password: z.string() })),
    option: new Option(
      '--password-file <passwordFile>',
      'Filepath to the password file',
    ),
    transform: passwordPromptTransform('--password-file'),
  }),
  currentPasswordFile: createOption({
    key: 'currentPasswordFile' as const,
    prompt: security.currentPasswordFilePrompt,
    validation: z.string().or(z.object({ _password: z.string() })),
    option: new Option(
      '-c, --current-password-file <currentPasswordFile>',
      'Filepath to the current password file',
    ),
    transform: passwordPromptTransform('--current-password-file'),
  }),
  newPasswordFile: createOption({
    key: 'newPasswordFile' as const,
    prompt: security.newPasswordFilePrompt,
    validation: z.string().or(z.object({ _password: z.string() })),
    option: new Option(
      '-n, --new-password-file <newPasswordFile>',
      'Filepath to the new password file',
    ),
    transform: passwordPromptTransform('--new-password-file'),
  }),
  // Devnet
  devnet: createOption({
    key: 'devnet' as const,
    prompt: devnetPrompts.devnetPrompt,
    validation: z.string(),
    option: new Option('-d, --devnet <devnet>', 'Devnet name'),
    expand: async (devnet: string) => {
      await ensureDevnetsConfiguration();
      try {
        return await loadDevnetConfig(devnet);
      } catch (e) {
        log.warning(
          `\nNo devnet "${devnet}" found. Please create the devnet.\n`,
        );
        await program.parseAsync(['', '', 'devnet', 'create']);
        const externalPrompt = createExternalPrompt({
          devnetPrompt: devnetPrompts.devnetPrompt,
        });
        const devnetName = await externalPrompt.devnetPrompt();
        return await loadDevnetConfig(devnetName);
      }
    },
  }),
  devnetName: createOption({
    key: 'name' as const,
    prompt: devnetPrompts.devnetNamePrompt,
    validation: z.string(),
    option: new Option('-n, --name <name>', 'Devnet name (e.g. "devnet")'),
    expand: async (name: string) => {
      return { foo: 'bar' };
    },
  }),
  devnetPort: createOption({
    key: 'port' as const,
    prompt: devnetPrompts.devnetPortPrompt,
    validation: z.number(),
    option: new Option(
      '-p, --port <port>',
      'Port to forward to the Chainweb node API (e.g. 8080)',
    ).argParser((value) => parseInt(value, 10)),
  }),
  devnetUseVolume: createOption({
    key: 'useVolume' as const,
    prompt: devnetPrompts.devnetUseVolumePrompt,
    validation: z.boolean(),
    option: new Option(
      '-u, --useVolume',
      'Create a persistent volume to mount to the container',
    ),
  }),
  devnetMountPactFolder: createOption({
    key: 'mountPactFolder' as const,
    prompt: devnetPrompts.devnetMountPactFolderPrompt,
    validation: z.string(),
    option: new Option(
      '-m, --mountPactFolder <mountPactFolder>',
      'Mount a folder containing Pact files to the container (e.g. "./pact")',
    ),
  }),
  devnetSelect: createOption({
    key: 'name' as const,
    prompt: devnetPrompts.devnetSelectPrompt,
    validation: z.string(),
    option: new Option('-n, --name <name>', 'Devnet name'),
  }),
  devnetVersion: createOption({
    key: 'version' as const,
    prompt: devnetPrompts.devnetVersionPrompt,
    validation: z.string(),
    option: new Option(
      '-v, --version <version>',
      'Version of the kadena/devnet Docker image to use (e.g. "latest")',
    ),
  }),
  // Logs
  logFolder: createOption({
    key: 'logFolder' as const,
    prompt: generic.logFolderPrompt,
    validation: z.string(),
    option: new Option(
      '-l, --log-folder <logFolder>',
      'Directory where the log file will be generated. (e.g. ./kadena/simulation-logs/',
    ),
  }),
  // Network
  networkName: createOption({
    key: 'networkName' as const,
    prompt: networks.networkNamePrompt,
    validation: z.string(),
    option: new Option(
      '-n, --network-name <networkName>',
      'Kadena network (e.g. "mainnet")',
    ),
    transform: (networkName: string) => {
      const trimmedNetworkName = networkName.trim();
      if (isNotEmptyString(trimmedNetworkName)) {
        return trimmedNetworkName;
      }

      throw new Error('Network name is required');
    },
  }),
  networkId: createOption({
    key: 'networkId' as const,
    prompt: networks.networkIdPrompt,
    validation: z.string(),
    option: new Option(
      '--network-id <networkId>',
      'Kadena network Id (e.g. "mainnet01")',
    ),
    transform: (networkId: string) => {
      return networkId.trim();
    },
  }),
  networkHost: createOption({
    key: 'networkHost' as const,
    prompt: networks.networkHostPrompt,
    validation: z.string(),
    option: new Option(
      '-h, --network-host <networkHost>',
      'Kadena network host (e.g. "https://api.chainweb.com")',
    ),
    transform: (value: string) => {
      // when it's optional and it's empty string and we don't want to validate it
      if (isNotEmptyString(value)) {
        const parse = z.string().url().safeParse(value.trim());
        if (!parse.success) {
          throw new Error(
            'Network host: Invalid URL. Please enter a valid URL.',
          );
        }
      }

      return value.trim();
    },
  }),
  networkExplorerUrl: createOption({
    key: 'networkExplorerUrl' as const,
    prompt: networks.networkExplorerUrlPrompt,
    validation: z.string().optional(),
    option: new Option(
      '-e, --network-explorer-url <networkExplorerUrl>',
      'Kadena network explorer URL (e.g. "https://explorer.chainweb.com/mainnet/tx/")',
    ),
  }),
  networkOverwrite: createOption({
    key: 'networkOverwrite' as const,
    prompt: networks.networkOverwritePrompt,
    validation: z.string(),
    option: new Option(
      '-o, --network-overwrite <networkOverwrite>',
      'Overwrite existing network configuration (yes/no)',
    ),
  }),
  networkDelete: createOption({
    key: 'networkDelete' as const,
    prompt: networks.networkDeletePrompt,
    validation: z.string(),
    option: new Option(
      '-d, --network-delete <networkDelete>',
      'Delete the configuration for network (yes/no)',
    ),
  }),
  network: createOption({
    key: 'network' as const,
    prompt: networks.networkSelectPrompt,
    validation: z.string(),
    option: new Option(
      '-n, --network <network>',
      'Kadena network (e.g. "mainnet")',
    ),
    expand: async (network: string) => {
      // await ensureNetworksConfiguration();
      try {
        return await loadNetworkConfig(network);
      } catch (e) {
        log.info(
          `\nNo configuration for network "${network}" found. Please configure the network.\n`,
        );
        await program.parseAsync(['', '', 'networks', 'create']);
        return await loadNetworkConfig(network);
      }
    },
  }),
  networkSelect: createOption({
    key: 'network' as const,
    prompt: networks.networkSelectOnlyPrompt,
    defaultIsOptional: false,
    validation: z.string(),
    option: new Option(
      '-n, --network <network>',
      'Kadena network (e.g. "mainnet")',
    ),
    expand: async (network: string) => {
      try {
        return await loadNetworkConfig(network);
      } catch (e) {
        throw new Error(
          `No network configuration found for "${network}". Please create a "${network}" network.`,
        );
      }
    },
  }),
  chainId: createOption({
    key: 'chainId' as const,
    prompt: networks.chainIdPrompt,
    defaultIsOptional: false,
    validation: z.string({
      /* eslint-disable-next-line @typescript-eslint/naming-convention */
      invalid_type_error: 'Error: -c, --chain-id must be a number',
    }),
    option: new Option('-c, --chain-id <chainId>'),
    transform: (chainId: string) => {
      const parsedChainId = parseInt(chainId.trim(), 10);
      try {
        chainIdValidation.parse(parsedChainId);
        return chainId as ChainId;
      } catch (error) {
        const errorMessage = formatZodFieldErrors(error);
        throw new Error(`Error: -c --chain-id ${errorMessage}`);
      }
    },
  }),
  // Keys
  keyPairs: createOption({
    key: 'keyPairs',
    prompt: keys.keyPairsPrompt,
    validation: z.string(),
    option: new Option(
      '-k, --key-pairs <keyPairs>',
      'Enter key pairs as string publicKey=xxx,secretKey=xxx;...',
    ),
    transform: (input) => {
      try {
        return parseKeyPairsInput(input);
      } catch (error) {
        throw new Error(`Error parsing key pairs: ${error.message}`);
      }
    },
  }),
  keyPublicKey: createOption({
    key: 'keyPublicKey' as const,
    prompt: keys.keyPublicKeyPrompt,
    validation: z.string(),
    option: new Option(
      '-p, --key-public-key <keyPublicKey>',
      'Enter a public key',
    ),
  }),
  keySecretKey: createOption({
    key: 'keySecretKey' as const,
    prompt: keys.keySecretKeyPrompt,
    validation: z.string(),
    option: new Option(
      '-s, --key-secret-key <keySecretKey>',
      'Enter a secret key',
    ),
  }),
  keyAlias: createOption({
    key: 'keyAlias',
    prompt: keys.keyAliasPrompt,
    validation: z.string(),
    option: new Option(
      '-a, --key-alias <keyAlias>',
      'Enter an alias to store your key',
    ),
  }),
  keyAliasSelect: createOption({
    key: 'keyAliasSelect',
    prompt: keys.keyGetAllKeyFilesPrompt,
    validation: z.string(),
    option: new Option(
      '-a, --key-alias-select <keyAliasSelect>',
      'Enter a alias to select keys from',
    ),
  }),
  walletName: createOption({
    key: 'walletName' as const,
    prompt: wallets.walletNamePrompt,
    validation: z.string(),
    option: new Option(
      '-w, --wallet-name <walletName>',
      'Enter you wallet name',
    ),
  }),
  keyIndexOrRange: createOption({
    key: 'keyIndexOrRange' as const,
    prompt: keys.keyIndexOrRangePrompt,
    validation: z.string(),
    option: new Option(
      '-r, --key-index-or-range <keyIndexOrRange>',
      'Enter the index or range of indices for key generation (e.g., 5 or 1-5). Default is 1',
    ),
    transform(value) {
      return parseKeyIndexOrRange(value);
    },
  }),
  keyAmount: createOption({
    key: 'keyAmount' as const,
    prompt: keys.keyAmountPrompt,
    validation: z.string(),
    option: new Option(
      '-n, --key-amount <keyAmount>',
      'Enter the number of key pairs you want to generate (default: 1)',
    ),
    transform: (keyAmount: string) => {
      const parsed = parseInt(keyAmount, 10);
      return isNaN(parsed) ? null : parsed;
    },
  }),
  keyGenFromChoice: createOption({
    key: 'keyGenFromChoice',
    prompt: keys.genFromChoicePrompt,
    validation: z.string(),
    option: new Option(
      '-c, --key-gen-from-choice <keyGenFromChoice>',
      'Choose an action for generating keys',
    ),
  }),
  walletSelect: createOption({
    key: 'walletName',
    prompt: wallets.walletSelectPrompt,
    validation: z.string(),
    option: new Option('-w, --wallet-name <walletName>', 'Enter your wallet'),
    defaultIsOptional: false,
    expand: async (walletName: string) => {
      return await getWallet(walletName);
    },
  }),
  walletNameSelectWithAll: createOption({
    key: 'walletName',
    prompt: wallets.walletSelectAllPrompt,
    validation: z.string(),
    option: new Option('-w, --wallet-name <walletName>', 'Enter your wallet'),
    defaultIsOptional: false,
    expand: async (walletName: string) => {
      return walletName === 'all' ? null : await getWallet(walletName);
    },
  }),
  keyMnemonic: createOption({
    key: 'keyMnemonic' as const,
    prompt: keys.keyMnemonicPrompt,
    validation: z.string(),
    option: new Option(
      '-m, --key-mnemonic <keyMnemonic>',
      'Enter your 12-word mnemonic phrase to generate keys from',
    ),
  }),
  keyUsePassword: createOption({
    key: 'keyUsePassword' as const,
    prompt: genericActionsPrompts.actionAskForPassword,
    validation: z.string(),
    option: new Option(
      '-u, --key-use-password <keyUsePassword>',
      'Do you want to use a password to encrypt your key? (yes/no)',
    ),
  }),
  keyFilename: createOption({
    key: 'keyFilename' as const,
    prompt: () => generic.genericFileNamePrompt('key'),
    validation: z.string(),
    option: new Option(
      '-f, --key-filename <keyFilename>',
      'Enter filename to store your key in',
    ),
  }),
  typescriptClean: createOption({
    key: 'typescriptClean' as const,
    prompt: typescript.typescriptClean,
    validation: z.boolean(),
    option: new Option('--typescript-clean', 'Clean existing generated files'),
  }),
  typescriptCapsInterface: createOption({
    key: 'typescriptCapsInterface' as const,
    prompt: typescript.typescriptCapsInterface,
    validation: z.string().optional(),
    option: new Option(
      '--typescript-caps-interface <interface>',
      'Custom name for the interface of the caps. Can be used to create a type definition with a limited set of capabilities.',
    ),
  }),
  typescriptFile: createOption({
    key: 'typescriptFile' as const,
    prompt: typescript.typescriptFile,
    validation: z.string().optional(),
    option: new Option(
      '--typescript-file <file>',
      'Generate d.ts from Pact contract file(s) (comma separated)',
    ),
    expand: async (file: string) => {
      return file
        .split(',')
        .map((value) => value.trim())
        .filter((f) => f.length);
    },
  }),
  typescriptContract: createOption({
    key: 'typescriptContract' as const,
    prompt: typescript.typescriptContract,
    validation: z.string().optional(),
    option: new Option(
      '--typescript-contract <contractName>',
      'Generate d.ts from Pact contract(s) from the blockchain (comma separated)',
    ),
    expand: async (contracts: string) => {
      return contracts
        .split(',')
        .map((value) => value.trim())
        .filter((c) => c.length);
    },
  }),
  typescriptNamespace: createOption({
    key: 'typescriptNamespace' as const,
    prompt: typescript.typescriptNamespace,
    validation: z.string().optional(),
    option: new Option(
      '--typescript-namespace <string>',
      'use as the namespace of the contract if its not clear in the contract',
    ),
  }),
  message: createOption({
    key: 'message' as const,
    prompt: generic.messagePrompt,
    validation: z.string(),
    option: new Option('-m, --message <message>', 'Enter message to decrypt'),
    transform: async (message: string) => {
      if (message.includes(WALLET_EXT) || message.includes(KEY_EXT)) {
        const keyFileContent = await readKeyFileContent(message);
        if (typeof keyFileContent === 'string') {
          return keyFileContent;
        }
        return keyFileContent?.secretKey;
      }
      return message;
    },
  }),

  // Dapp
  dappTemplate: createOption({
    key: 'dappTemplate',
    prompt: genericActionsPrompts.actionAskForDappTemplate,
    validation: z.string(),
    option: new Option(
      '-t, --dapp-template <dappTemplate>',
      'Select a dapp template',
    ),
  }),
  // common
  outFileJson: createOption({
    key: 'outFile',
    prompt: tx.outFilePrompt,
    validation: z.string().optional(),
    option: new Option(
      '-o, --out-file <outFile>',
      'Enter the file name to save the output',
    ),
    defaultIsOptional: true,
    transform(value: string) {
      if (!value) return null;
      const file = value.endsWith('.json') ? value : `${value}.json`;
      return join(process.cwd(), file);
    },
  }),
} as const;

export type GlobalOptions = typeof globalOptions;
export type GlobalFlags = typeof globalFlags;
