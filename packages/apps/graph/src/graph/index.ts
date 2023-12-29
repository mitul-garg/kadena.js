import { builder } from './builder';
import './objects/block';
import './objects/chain-fungible-account';
import './objects/chain-non-fungible-account';
import './objects/event';
import './objects/fungible-account';
import './objects/graph-configuration';
import './objects/guard';
import './objects/miner-key';
import './objects/non-fungible-account';
import './objects/signer';
import './objects/token';
import './objects/total-count';
import './objects/transaction';
import './objects/transfer';
import './query/block';
import './query/blocks-from-height';
import './query/chain-fungible-account';
import './query/chain-non-fungible-account';
import './query/completed-block-heights';
import './query/fungible-account';
import './query/gas-limit-estimate';
import './query/graph-configuration';
import './query/last-block-height';
import './query/non-fungible-account';
import './query/pact-query';
import './query/transaction-by-public-key';
import './query/transactions';
import './query/transfers';
import './subscription/event';
import './subscription/new-blocks';
import './subscription/transaction';
builder.queryType({});
// no mutation fields defined yet, hence commented
// builder.mutationType({});
builder.subscriptionType({});
