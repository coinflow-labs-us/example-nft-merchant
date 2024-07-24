import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { useSolanaWallets, usePrivy } from "@privy-io/react-auth";
import { SolanaWallet } from "@coinflowlabs/react";

export interface WalletContextProps {
  wallet: SolanaWallet;
  connection: Connection;
  ready: boolean;
}

const WalletContext = createContext<WalletContextProps>({
  connection: new Connection(import.meta.env.VITE_RPC_URL, "confirmed"),
  wallet: {
    publicKey: null,
    sendTransaction: () => {},
  },
  ready: false,
});

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const { wallets } = useSolanaWallets();
  const { ready, user } = usePrivy();

  const connection = useMemo(() => {
    return new Connection(import.meta.env.VITE_RPC_URL, "confirmed");
  }, []);

  const solanaWallet = useMemo(() => {
    if (!user || user.linkedAccounts.length !== 3 || wallets.length === 0)
      // 3 accounts, email, EVM, solana
      return null;
    return wallets[0];
  }, [user, wallets]);

  const signTransaction = useCallback(
    async (
      transaction: VersionedTransaction
    ): Promise<VersionedTransaction> => {
      const serializedMessage = Buffer.from(transaction.message.serialize());
      const provider = await solanaWallet!.getProvider();

      const { signature } = await provider.request({
        method: "signMessage",
        params: {
          message: serializedMessage.toString("base64"),
        },
      });

      transaction.addSignature(
        new PublicKey(solanaWallet!.address),
        Uint8Array.from(Buffer.from(signature, "base64"))
      );
      return transaction;
    },
    [solanaWallet]
  );

  const sendTransaction = useCallback(
    async (transaction: VersionedTransaction | Transaction) => {
      transaction = (await signTransaction(
        transaction as VersionedTransaction
      ))!;

      const signedTransaction = transaction.serialize();
      await connection.sendRawTransaction(signedTransaction);
    },
    [connection, signTransaction]
  );

  return (
    <WalletContext.Provider
      value={{
        wallet: {
          publicKey:
            user && solanaWallet ? new PublicKey(solanaWallet.address) : null,
          signTransaction,
          sendTransaction,
        },
        connection,
        ready,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
