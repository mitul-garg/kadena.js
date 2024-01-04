import { getChainNonFungibleAccount } from '@services/account-service';
import { COMPLEXITY } from '@services/complexity';
import { normalizeError } from '@utils/errors';
import { builder } from '../builder';
import ChainNonFungibleAccount from '../objects/chain-non-fungible-account';

builder.queryField('chainNonFungibleAccount', (t) =>
  t.field({
    description: 'Retrieve an account by its name on a specific chain.',
    args: {
      accountName: t.arg.string({ required: true }),
      chainId: t.arg.string({ required: true }),
    },
    type: ChainNonFungibleAccount,
    nullable: true,
    complexity:
      COMPLEXITY.FIELD.CHAINWEB_NODE +
      COMPLEXITY.FIELD.PRISMA_WITHOUT_RELATIONS,
    async resolve(__parent, args) {
      try {
        return getChainNonFungibleAccount({
          chainId: args.chainId,
          accountName: args.accountName,
        });
      } catch (error) {
        throw normalizeError(error);
      }
    },
  }),
);
