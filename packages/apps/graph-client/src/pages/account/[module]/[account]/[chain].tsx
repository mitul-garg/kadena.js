import {
  Box,
  ContentHeader,
  Grid,
  Link,
  Notification,
  Table,
} from '@kadena/react-ui';

import { useGetChainAccountQuery } from '../../../../__generated__/sdk';
import Loader from '../../../../components/loader/loader';
import { mainStyle } from '../../../../components/main/styles.css';
import { Text } from '../../../../components/text';
import routes from '../../../../constants/routes';

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { truncate } from '../../../../utils/truncate';

const ChainAccount: React.FC = () => {
  const router = useRouter();

  const {
    loading: loadingChainAccount,
    data: chainAccountQuery,
    error,
  } = useGetChainAccountQuery({
    variables: {
      moduleName: router.query.module as string,
      accountName: router.query.account as string,
      chainId: router.query.chain as string,
    },
  });

  return (
    <div style={{ padding: '0 50px 30px 50px' }}>
      <Head>
        <title>Kadena Graph Client</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={mainStyle}>
        <Text
          as="h1"
          css={{ display: 'block', color: '$mauve12', fontSize: 48, my: '$12' }}
        >
          Kadena Graph Client
        </Text>

        <div>
          {loadingChainAccount && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Loader /> <span>Retrieving account information...</span>
            </div>
          )}
          {error && (
            <Notification.Root color="negative" icon="Close">
              Unknown error:
              <br />
              <br />
              <code>{error.message}</code>
              <br />
              <br />
              Check if the Graph server is running.
            </Notification.Root>
          )}
          {chainAccountQuery?.chainAccount && (
            <div>
              <Table.Root wordBreak='break-all'>
                <Table.Body>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Account Name</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.accountName}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Module</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.moduleName}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Chain</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.chainId}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Balance</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.balance}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Guard Predicate</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.guard.predicate}
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <strong>Guard Keys</strong>
                    </Table.Td>
                    <Table.Td>
                      {chainAccountQuery.chainAccount.guard.keys}
                    </Table.Td>
                  </Table.Tr>
                </Table.Body>
              </Table.Root>
              <Box margin={'$8'} />
              <Grid.Root columns={2} gap="$lg">
                <Grid.Item>
                  <ContentHeader
                    heading="Transfers"
                    icon="KIcon"
                    description="All transfers from this fungible."
                  />
                  <Box margin={'$4'} />
                  <Table.Root wordBreak="break-word">
                    <Table.Head>
                      <Table.Tr>
                        <Table.Th>Block Height</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>From Account</Table.Th>
                        <Table.Th>To Account</Table.Th>
                        <Table.Th>Request key</Table.Th>
                      </Table.Tr>
                    </Table.Head>
                    <Table.Body>
                      {chainAccountQuery.chainAccount.transfers.edges.map(
                        (edge, index) => {
                          return (
                            <Table.Tr key={index}>
                              <Table.Td>{edge?.node.height}</Table.Td>
                              <Table.Td>{edge?.node.amount}</Table.Td>
                              <Table.Td>
                                <span title={edge?.node.fromAccount}>
                                  {truncate(edge?.node.fromAccount)}
                                </span>
                              </Table.Td>
                              <Table.Td>
                                <span title={edge?.node.toAccount}>
                                  {truncate(edge?.node.toAccount)}
                                </span>
                              </Table.Td>
                              <Table.Td>
                                <Link
                                  href={`${routes.TRANSACTION}/${edge?.node.requestKey}`}
                                >
                                  {truncate(edge?.node.requestKey)}
                                </Link>
                              </Table.Td>
                            </Table.Tr>
                          );
                        },
                      )}
                    </Table.Body>
                  </Table.Root>
                </Grid.Item>
                <Grid.Item>
                  <ContentHeader
                    heading="Transactions"
                    icon="KIcon"
                    description="All transactions where this account is the initiator."
                  />
                  <Box margin={'$4'} />
                  <Table.Root wordBreak="break-word">
                    <Table.Head>
                      <Table.Tr>
                        <Table.Th>Timestamp</Table.Th>
                        <Table.Th>Block Height</Table.Th>
                        <Table.Th>Request Key</Table.Th>
                        <Table.Th>Code</Table.Th>
                      </Table.Tr>
                    </Table.Head>
                    <Table.Body>
                      {chainAccountQuery.chainAccount.transactions.edges.map(
                        (edge, index) => {
                          return (
                            <Table.Tr key={index}>
                              <Table.Td>{new Date(edge?.node.creationTime).toLocaleString()}</Table.Td>
                              <Table.Td>{edge?.node.height}</Table.Td>
                              <Table.Td>
                                <Link
                                  href={`${routes.TRANSACTION}/${edge?.node.requestKey}`}
                                >
                                  {truncate(edge?.node.requestKey)}
                                </Link>
                              </Table.Td>
                              <Table.Td>
                                <span title={edge?.node.code as string}>
                                  {truncate(edge?.node.code)}
                                </span>
                              </Table.Td>
                            </Table.Tr>
                          );
                        },
                      )}
                    </Table.Body>
                  </Table.Root>
                </Grid.Item>
              </Grid.Root>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChainAccount;
