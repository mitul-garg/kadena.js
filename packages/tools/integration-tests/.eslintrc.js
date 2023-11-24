require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    '@kadena-dev/eslint-config/profile/lib',
    'plugin:playwright/recommended',
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  ignorePatterns: ['vitest.*.ts'],
  rules: {
    '@kadena-dev/typedef-var': 'off',
    '@rushstack/typedef-var': 'off',
  },
};
