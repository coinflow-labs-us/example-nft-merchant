import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {MetaKeep} from 'metakeep';
import {useMetakeepStore} from '../context/useMetakeepStore';

export function useMetakeepWallet() {
  const {metakeep, setMetakeep, publicKey, setPublicKey, email, setEmail} =
    useMetakeepStore();

  const [initialized, setInitialized] = useState(false);

  const connect = useCallback(async (email: string) => {
    const appId = '7c1a0762-8d68-45c6-8b38-ad7d8ad2615c';

    if (!email) return null;

    const m = new MetaKeep({
      appId,
      user: {
        email,
      },
    });

    setMetakeep(m);

    const wallet = await m.getWallet();

    setPublicKey(new PublicKey(wallet.wallet.solAddress));

    return m;
  }, []);

  const disconnect = useCallback(() => {
    setMetakeep(null);
    setPublicKey(null);
    setEmail('');
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!email) setInitialized(true);
    else {
      connect(email)
        .then(() => setInitialized(true))
        .catch(() => setEmail(''));
    }
  }, []);

  const connection = useMemo(() => {
    return new Connection(process.env.REACT_APP_RPC_URL!, 'confirmed');
  }, []);

  const signTransaction = useCallback(
    async <T extends Transaction | VersionedTransaction>(
      transaction: T
    ): Promise<T> => {
      if (!metakeep) throw new Error('metakeep is null');

      const metakeepRes: {signature: string} = await metakeep.signTransaction(
        transaction,
        'Complete payment'
      );
      console.log({metakeepRes});
      const signature = Buffer.from(
        metakeepRes.signature.replace('0x', ''),
        'hex'
      );
      if (transaction instanceof Transaction) {
        transaction.signatures.push({
          publicKey: publicKey!,
          signature,
        });
        transaction.signatures = transaction.signatures.filter(
          sig => !!sig.signature
        );
      } else {
        transaction.signatures.push(signature);
      }

      return transaction;
    },
    [metakeep, publicKey]
  );

  const sendTransaction = useCallback(
    async <T extends Transaction | VersionedTransaction>(
      transaction: T
    ): Promise<string> => {
      console.log(
        Buffer.from(
          transaction.serialize({
            verifySignatures: false,
            requireAllSignatures: false,
          })
        ).toString('base64')
      );
      const signedTx = await signTransaction(transaction);
      console.log({signedTx});
      return await connection.sendRawTransaction(signedTx.serialize());
    },
    [connection, signTransaction]
  );

  const signMessage = useCallback(
    async (message: Uint8Array) => {
      if (!metakeep) throw new Error('metakeep is null');
      const {signature} = await metakeep.signMessage(
        Buffer.from(message).toString('utf8'),
        'Sign in'
      );
      return Uint8Array.from(Buffer.from(signature.slice(2), 'hex'));
    },
    [metakeep]
  );

  return {
    publicKey,
    sendTransaction,
    signMessage,
    connection,
    signTransaction,
    connect,
    disconnect,
    initialized,
  };
}
