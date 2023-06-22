import '@/resources/styles/globals.css';

import { Layout } from '@/components/Common';
import { AppContextProvider } from '@/context/app-context';
import type { AppProps } from 'next/app';
import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <AppContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppContextProvider>
);

export default App;
