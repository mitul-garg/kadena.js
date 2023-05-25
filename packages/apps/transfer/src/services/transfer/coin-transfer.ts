import { ChainwebNetworkId } from '@kadena/chainweb-node-client';
import { PactCommand } from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';
import { ChainId } from '@kadena/types';

import { convertDecimal, generateApiHost, onlyKey } from '../utils/utils';

const gasLimit = 2300;
const gasPrice = 0.00001;
const ttl = 28800;

export interface TransferResult {
  requestKey?: string;
  status?: string;
}

export async function transferCreate(
  fromAccount: string,
  toAccount: string,
  amount: string,
  fromPrivateKey: string,
  chainId: ChainId,
  networkId: ChainwebNetworkId,
): Promise<PactCommand> {
  if (isNaN(Number(amount))) {
    throw new Error('Amount must be a number');
  }

  const pactCommand = new PactCommand();
  pactCommand.code = `(coin.transfer-create "${fromAccount}" "${toAccount}" (read-keyset "ks") ${convertDecimal(
    amount,
  )})`;

  pactCommand
    .addCap('coin.GAS', onlyKey(fromAccount))
    .addCap(
      'coin.TRANSFER',
      onlyKey(fromAccount),
      fromAccount,
      toAccount,
      Number(amount),
    )
    .addData({ ks: { pred: 'keys-all', keys: [onlyKey(toAccount)] } })
    .setMeta(
      {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        ttl: ttl,
        chainId: chainId,
        sender: fromAccount,
      },
      networkId,
    );

  pactCommand.createCommand();

  if (pactCommand.cmd === undefined) {
    throw new Error('Failed to create transaction');
  }

  const signature = sign(pactCommand.cmd, {
    secretKey: fromPrivateKey,
    publicKey: onlyKey(fromAccount),
  });

  if (signature.sig === undefined) {
    throw new Error('Failed to sign transaction');
  }

  pactCommand.addSignatures({
    pubKey: onlyKey(fromAccount),
    sig: signature.sig,
  });

  console.log(`Sending transaction: ${pactCommand.code}`);

  await pactCommand.send(generateApiHost(networkId, chainId));
  return pactCommand;
}

export async function crossTransfer(
  fromAccount: string,
  fromChainId: ChainId,
  toAccount: string,
  toChainId: ChainId,
  amount: string,
  fromPrivateKey: string,
  networkId: ChainwebNetworkId,
): Promise<PactCommand> {
  const pactCommand = new PactCommand();
  pactCommand.code = `(coin.transfer-crosschain "${fromAccount}" "${toAccount}" (read-keyset "ks") "${toChainId}" ${amount})`;

  pactCommand
    .addCap('coin.GAS', onlyKey(fromAccount))
    .addCap<any>(
      'coin.TRANSFER_XCHAIN',
      fromAccount,
      toAccount,
      {
        decimal: convertDecimal(amount),
      },
      toChainId,
    )
    .addData({ ks: { pred: 'keys-all', keys: [onlyKey(toAccount)] } })
    .setMeta(
      {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        ttl: ttl,
        chainId: fromChainId,
        sender: fromAccount,
      },
      networkId,
    );

  pactCommand.createCommand();
  console.log('Before Ading Signature', pactCommand);
  if (pactCommand.cmd === undefined) {
    throw new Error('Failed to create transaction');
  }

  const signature = sign(pactCommand.cmd, {
    secretKey: fromPrivateKey,
    publicKey: onlyKey(fromAccount),
  });

  if (signature.sig === undefined) {
    throw new Error('Failed to sign transaction');
  }

  // pactCommand.addSignatures({
  //   pubKey: onlyKey(fromAccount),
  //   sig: signature.sig,
  // });

  // console.log(`Sending transaction: ${pactCommand.code}`);
  // console.log('After Signature', pactCommand);

  await pactCommand.local(generateApiHost(networkId, fromChainId));
  return pactCommand;
}
