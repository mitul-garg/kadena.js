import { test as baseTest } from '@playwright/test';
import FaucetPage from './pages/faucet.page';
import HomePage from './pages/home.page';
import TransactionsPage from './pages/transactions.page';
import AccountPage from './pages/account.page';
import MockHelper from '@kadena/e2e-components/helpers/mock.helper';
import ModuleExplorerPage from './pages/moduleExplorer.page';

export const test = baseTest.extend<{
  home: HomePage;
  transactions: TransactionsPage;
  faucet: FaucetPage;
  account: AccountPage;
  mockHelper: MockHelper;
  moduleExplorer: ModuleExplorerPage;
}>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  faucet: async ({ page }, use) => {
    await use(new FaucetPage(page));
  },
  transactions: async ({ page }, use) => {
    await use(new TransactionsPage(page));
  },
  account: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  moduleExplorer: async ({ page }, use) => {
    await use(new ModuleExplorerPage(page));
  },

  mockHelper: async ({ page }, use) => {
    await use(new MockHelper(page));
  },
});
