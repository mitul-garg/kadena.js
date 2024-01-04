import { useGetNonFungibleAccountQuery } from '@/__generated__/sdk';
import { GraphQLQueryDialog } from '@/components/graphql-query-dialog/graphql-query-dialog';
import LoaderAndError from '@/components/loader-and-error/loader-and-error';
import routes from '@/constants/routes';
import { getNonFungibleAccount } from '@/graphql/queries.graph';
import {
  Box,
  Breadcrumbs,
  Notification,
  Stack,
  TabItem,
  Table,
  Tabs,
} from '@kadena/react-ui';
import { useRouter } from 'next/router';

const NonFungibleAccount: React.FC = () => {
  const router = useRouter();

  const variables = {
    accountName: router.query.account as string,
  };

  const { loading, data, error } = useGetNonFungibleAccountQuery({ variables });

  return (
    <>
      <Stack justifyContent="space-between">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href={`${routes.HOME}`}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item>Account Overview</Breadcrumbs.Item>
        </Breadcrumbs.Root>
        <GraphQLQueryDialog
          queries={[{ query: getNonFungibleAccount, variables }]}
        />
      </Stack>

      <Box marginBottom="$8" />

      <LoaderAndError
        error={error}
        loading={loading}
        loaderText="Retrieving account information..."
      />

      {data?.nonFungibleAccount &&
        data?.nonFungibleAccount?.chainAccounts.length === 0 && (
          <>
            <Notification intent="info" role="status">
              We could not find any data on this account. Please check the
              account name.
            </Notification>
            <Box margin={'$4'} />
          </>
        )}

      {data?.nonFungibleAccount && (
        <div>
          <Table.Root wordBreak="break-all">
            <Table.Body>
              <Table.Tr>
                <Table.Td>
                  <strong>Account Name</strong>
                </Table.Td>
                <Table.Td>{data.nonFungibleAccount.accountName}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <strong>Chain Accounts</strong>
                </Table.Td>
                <Table.Td>
                  {data.nonFungibleAccount.chainAccounts.map((chainAccount) => (
                    <Box key={chainAccount.chainId}>{chainAccount.chainId}</Box>
                  ))}
                </Table.Td>
              </Table.Tr>
            </Table.Body>
          </Table.Root>
          <Box margin={'$8'} />
          <Tabs defaultSelectedKey="Tokens">
            <TabItem title="Tokens" key="Tokens">
              <Box margin={'$4'} />
            </TabItem>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default NonFungibleAccount;
