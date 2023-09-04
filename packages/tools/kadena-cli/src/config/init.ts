import { processZodErrors } from '../utils/process-zod-errors';

import { Command } from 'commander';

export interface IConfigInitOptions {}

export function initCommand(program: Command, version: string): void {
  program
    .command('init')
    .description('create `.kadena/` directory with `config.yaml`')
    .action((args: IConfigInitOptions) => {
      try {
        // TODO: use @inquirer/prompts to interactively get missing flags
        // TODO: create zod validator
        // Options.parse(args);
      } catch (e) {
        processZodErrors(program, e, args);
      }

      // TODO: implement `kda config init`
      throw new Error('Not Implemented Yet');
    });
}
