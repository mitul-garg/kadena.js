import baseConfig from '@kadena-dev/shared-config/vitest.config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [vanillaExtractPlugin({ emitCssInSsr: true })],
    test: {
      setupFiles: ['vitest.setup.ts'],
      environment: 'happy-dom',
      threads: false,
      coverage: {
        provider: 'v8',
        lines: 73.76,
        functions: 40.27,
        branches: 70.51,
        statements: 73.76,
        thresholdAutoUpdate: true,
      },
    },
  }),
);
