import {
  defaultDevnet,
  defaultDevnetsPath,
  devnetDefaults,
} from '../../constants/devnets.js';
import { PathExists, removeFile, writeFile } from '../../utils/filesystem.js';
import { mergeConfigs, sanitizeFilename } from '../../utils/helpers.js';

import type { WriteFileOptions } from 'fs';
import { existsSync, readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export interface ICustomDevnetsChoice {
  value: string;
  name?: string;
  description?: string;
  disabled?: boolean | string;
}

export interface IDevnetsCreateOptions {
  name: string;
  port: number;
  useVolume: boolean;
  mountPactFolder: string;
  version: string;
}

/**
 * Writes the given devnet setting to the devnet folder
 *
 * @param {TDevnetsCreateOptions} options - The set of configuration options.
 * @param {string} options.name - The name of your devnet container.
 * @param {number} options.port - The port to forward to the Chainweb node API.
 * @param {boolean} options.useVolume - Whether or not to mount a persistent volume to the container.
 * @param {string} options.mountPactFolder - The folder containing Pact files to mount to the container.
 * @param {string} options.version - The version of the kadena/devnet image to use.
 * @returns {void} - No return value; the function writes directly to a file.
 */
export function writeDevnet(options: IDevnetsCreateOptions): void {
  const { name } = options;
  const sanitizedDevnet = sanitizeFilename(name).toLowerCase();
  const devnetFilePath = path.join(
    defaultDevnetsPath,
    `${sanitizedDevnet}.yaml`,
  );

  let existingConfig: IDevnetsCreateOptions;

  if (PathExists(devnetFilePath)) {
    existingConfig = yaml.load(
      readFileSync(devnetFilePath, 'utf8'),
    ) as IDevnetsCreateOptions;
  } else {
    // Explicitly check if devnet key exists in devnetDefaults and is not undefined
    existingConfig =
      typeof devnetDefaults[name] !== 'undefined'
        ? { ...devnetDefaults[name] }
        : { ...devnetDefaults.devnet };
  }

  const devnetConfig = mergeConfigs(existingConfig, options);

  writeFile(
    devnetFilePath,
    yaml.dump(devnetConfig),
    'utf8' as WriteFileOptions,
  );
}

/**
 * Removes the given devnet setting from the devnets folder
 *
 * @param {Pick<IDevnetsCreateOptions, 'name'>} options - The set of configuration options.
 * @param {string} options.name - The name of the devnet configuration.
 */
export function removeDevnetConfiguration(
  options: Pick<IDevnetsCreateOptions, 'name'>,
): void {
  const { name } = options;
  const sanitizedDevnet = sanitizeFilename(name).toLowerCase();
  const devnetFilePath = path.join(
    defaultDevnetsPath,
    `${sanitizedDevnet}.yaml`,
  );

  removeFile(devnetFilePath);
}

export function defaultDevnetIsConfigured(): boolean {
  return PathExists(path.join(defaultDevnetsPath, `${defaultDevnet}.yaml`));
}

export function getDevnetConfiguration(
  name: string,
): IDevnetsCreateOptions | undefined {
  const devnetFilePath = path.join(defaultDevnetsPath, `${name}.yaml`);

  if (!PathExists(devnetFilePath)) {
    return undefined;
  }

  return yaml.load(
    readFileSync(devnetFilePath, 'utf8'),
  ) as IDevnetsCreateOptions;
}

export function loadDevnetConfig(
  devnet: string,
): IDevnetsCreateOptions | never {
  const devnetFilePath = path.join(defaultDevnetsPath, `${devnet}.yaml`);

  if (!existsSync(devnetFilePath)) {
    throw new Error('Devnet configuration file not found.');
  }

  return yaml.load(
    readFileSync(devnetFilePath, 'utf8'),
  ) as IDevnetsCreateOptions;
}
