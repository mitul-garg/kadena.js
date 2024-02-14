import type { IPactCommand } from '@kadena/client';
import { createTransaction, isSignedTransaction } from '@kadena/client';
import {
  createCrossChainCommand,
  transferCommand,
  transferCreateCommand,
} from '@kadena/client-utils/coin';
import type { ICommand, IUnsignedCommand } from '@kadena/types';
import type {
  BuildTransactionResult,
  TransferCrossChainTxParams,
} from '@ledgerhq/hw-app-kda';
import AppKda from '@ledgerhq/hw-app-kda';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { useAsyncFn } from 'react-use';
import useLedgerApp from './use-ledger-app';

type ITransferInput = Parameters<typeof transferCommand>[0];
type ICreateTransferInput = Parameters<typeof transferCreateCommand>[0];
type ICrossChainInput = Parameters<typeof createCrossChainCommand>[0];

type TransferInput = Omit<ICrossChainInput, 'targetChainId' | 'receiver'> & {
  targetChainId?: ICrossChainInput['targetChainId'];
  receiver: ITransferInput['receiver'] | ICreateTransferInput['receiver'];
};

/**
 * parse a ICommand or IUnsignedCommand JSON object to IPactCommand
 *
 * FYI; copied over from;
 *
 * @see; packages/libs/client/src/signing/utils/parseTransactionCommand.ts
 */
const parseTransactionCommand: (
  transaction: IUnsignedCommand | ICommand,
) => IPactCommand = (transaction) => {
  return JSON.parse(transaction.cmd) as IPactCommand;
};

const pactToLedger = (
  pactCommand: IUnsignedCommand,
  transferInput: TransferInput,
  derivationPath: string,
): TransferCrossChainTxParams => {
  const parsedTransaction = parseTransactionCommand(pactCommand);

  const recipient =
    typeof transferInput.receiver === 'string'
      ? transferInput.receiver
      : transferInput.receiver.account;

  console.log('pactToledger', {
    parsedTransaction,
    pactCommand,
    recipient,
    amount: transferInput.amount,
    chainId: parseInt(parsedTransaction.meta.chainId, 10),
    network: parsedTransaction.networkId,
  });

  return {
    path: derivationPath,
    recipient: recipient,
    amount: transferInput.amount,
    chainId: parseInt(parsedTransaction.meta.chainId, 10),
    recipient_chainId: parseInt(transferInput.targetChainId ?? '0', 10),
    network: parsedTransaction.networkId,
  };
};

const isCrossChainInput = (
  transferInput: TransferInput,
): transferInput is ICrossChainInput => {
  return !!transferInput.targetChainId;
};

const isTransferInput = (
  transferInput: TransferInput,
): transferInput is ITransferInput => {
  return typeof transferInput.receiver === 'string';
};

const transferInputToPactCommand = (transferInput: TransferInput) => {
  if (isCrossChainInput(transferInput)) {
    return createCrossChainCommand(transferInput);
  }

  if (isTransferInput(transferInput)) {
    return transferCommand(transferInput);
  }

  return transferCreateCommand(transferInput as ICreateTransferInput);
};

const signWithLedger = (
  app: AppKda,
  pactCommand: IUnsignedCommand,
  transferInput: TransferInput,
  derivationPath: string,
) => {
  const ledgerParams = pactToLedger(pactCommand, transferInput, derivationPath);

  if (isCrossChainInput(transferInput)) {
    return app.signTransferCrossChainTx(ledgerParams);
  }

  if (isTransferInput(transferInput)) {
    return app.signTransferTx(ledgerParams);
  }

  return app.signTransferCreateTx(ledgerParams);
};

const ledgerToPact = (
  ledgerCommand: BuildTransactionResult,
  pactCommand: ICommand | IUnsignedCommand,
): ICommand | IUnsignedCommand => {
  pactCommand.sigs = ledgerCommand.pact_command.sigs;

  return pactCommand;
};

const sign = async (
  _app: AppKda | null,
  transferInput: TransferInput,
  networkId: string,
  derivationPath: string,
) => {
  // const x = pactToLedger(pactCommand);
  // if (app === null) {
  //   console.log("Make sure you've connected the Ledger device");
  //   return undefined;
  // }

  const transport = await TransportWebHID.create();
  const app = new AppKda(transport);

  const transaction = createTransaction(
    transferInputToPactCommand(transferInput)({ networkId }),
  );

  const signed = await signWithLedger(
    app,
    transaction,
    transferInput,
    derivationPath,
  );

  const pactCommand = ledgerToPact(signed, transaction);

  return { pactCommand, isSigned: isSignedTransaction(pactCommand) };
};

const useLedgerSign = (
  transferInput: TransferInput,
  { networkId, derivationPath }: { networkId: string; derivationPath: string },
) => {
  // const app = useLedgerApp();
  const app = null;

  return useAsyncFn(
    () => sign(app, transferInput, networkId, derivationPath),
    [derivationPath, networkId, transferInput],
  );
};

export { useLedgerSign };
