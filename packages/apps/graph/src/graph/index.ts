import { builder } from './builder';
import './objects/block';
import './objects/cmd';
import './objects/event';
import './objects/fungible-account';
import './objects/fungible-chain-account';
import './objects/gas-limit-estimation';
import './objects/graph-configuration';
import './objects/guard';
import './objects/meta';
import './objects/miner-key';
import './objects/non-fungible-account';
import './objects/non-fungible-chain-account';
import './objects/payload';
import './objects/signer';
import './objects/token';
import './objects/token-info';
import './objects/total-count';
import './objects/transaction';
import './objects/transaction-result';
import './objects/transfer';
import './query/block';
import './query/blocks-from-depth';
import './query/blocks-from-height';
import './query/completed-block-heights';
import './query/events';
import './query/fungible-account';
import './query/fungible-account-by-public-key';
import './query/fungible-chain-account';
import './query/fungible-chain-account-by-public-key';
import './query/gas-limit-estimate';
import './query/graph-configuration';
import './query/last-block-height';
import './query/non-fungible-account';
import './query/non-fungible-chain-account';
import './query/pact-query';
import './query/transaction-by-public-key';
import './query/transactions';
import './query/transfers';
import './subscription/events';
import './subscription/new-blocks';
import './subscription/new-blocks-from-depth';
import './subscription/transaction';

builder.queryType({});
builder.subscriptionType({});
