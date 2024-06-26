import { Command } from 'commander';
import { format } from 'util';
import { vi } from 'vitest';
import { loadProgram } from '../program.js';
import { log } from './logger.js';
import * as prompts from './prompts.js';
import * as readStdin from './stdin.js';

export function isValidEncryptedValue(value: string | unknown): boolean {
  if (typeof value !== 'string') return false;
  const buffer = Buffer.from(value, 'base64').toString('utf8');
  const parts = buffer.split('.');
  // parts: salt, iv, tag, data, public key (only for secretKeys, not rootKey)
  return parts.length === 3 || parts.length === 4;
}

const captureLogs = (): (() => string[]) => {
  const logs: string[] = [];
  log.setTransport((record) => {
    logs.push(format(...record.args));
  });
  return () => logs;
};

export const runCommand = async (
  args: string[],
  stdin?: string,
): Promise<string> => {
  process.stderr.isTTY = true;
  const getLogs = captureLogs();
  if (stdin !== undefined) {
    const stdinMock = vi.spyOn(readStdin, 'readStdin');
    stdinMock.mockImplementation(async () => stdin ?? null);
  }
  await loadProgram(new Command()).parseAsync(['node', 'index.js', ...args]);
  return getLogs().join('\n');
};

export const mockPrompts = (data: {
  select?: Record<string, string>;
  password?: Record<string, string>;
  input?: Record<string, string>;
  checkbox?: Record<string, number[]>;
  verbose?: boolean;
}): void => {
  vi.spyOn(prompts, 'select').mockImplementation((async (args) => {
    const message = (await args.message) as string;
    // eslint-disable-next-line no-console, @typescript-eslint/strict-boolean-expressions
    if (data.verbose) console.log(`select: ${message}`);
    if (!data.select) return '';
    const match = Object.entries(data.select).filter((x) =>
      message.includes(x[0]),
    );
    if (match.length > 0) return match[0][1];
    return '';
  }) as typeof prompts.select);

  vi.spyOn(prompts, 'input').mockImplementation((async (args) => {
    const message = (await args.message) as string;
    // eslint-disable-next-line no-console, @typescript-eslint/strict-boolean-expressions
    if (data.verbose) console.log(`input: ${message}`);
    if (!data.input) return '';
    const match = Object.entries(data.input).filter((x) =>
      message.includes(x[0]),
    );
    if (match.length > 0) return match[0][1];
    return '';
  }) as typeof prompts.input);

  vi.spyOn(prompts, 'password').mockImplementation((async (args) => {
    if (!data.password) return '';
    const message = (await args.message) as string;
    // eslint-disable-next-line no-console, @typescript-eslint/strict-boolean-expressions
    if (data.verbose) console.log(`password: ${message}`);
    const match = Object.entries(data.password).filter((x) =>
      message.includes(x[0]),
    );
    if (match.length > 0) return match[0][1];
    return '';
  }) as typeof prompts.password);

  vi.spyOn(prompts, 'checkbox').mockImplementation((async (args) => {
    const message = (await args.message) as string;
    const choices = args.choices.filter((x) => x.type !== 'separator');

    // eslint-disable-next-line no-console, @typescript-eslint/strict-boolean-expressions
    if (data.verbose) console.log(`checkbox: ${message}`);
    if (!data.checkbox) return [];
    const match = Object.entries(data.checkbox).filter((x) =>
      message.includes(x[0]),
    );

    if (match.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return match[0][1].map((i) => (choices[i] as any).value);
    }
    return [];
  }) as typeof prompts.checkbox);
};
