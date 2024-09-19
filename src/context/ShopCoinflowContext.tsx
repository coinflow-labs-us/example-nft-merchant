import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ComputeBudgetProgram,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { CoinflowEnvs } from "@coinflowlabs/react";
import { buyEditionTx } from "@phantasia/nft-store-interface/transactions/edition_sale/buy-edition-tx";
import {
  NftStoreConnectionService,
  SolanaNet,
} from "@phantasia/nft-store-interface";
import { useWallet } from "../wallet/Wallet.tsx";

export const coinflowEnv: CoinflowEnvs = "staging";

interface ShopContextProps {
  transaction: VersionedTransaction | null;
  amount: number;
  buyCredits: boolean;
  setBuyCredits: (b: boolean) => void;
}

export const ShopCoinflowContext = React.createContext<ShopContextProps>({
  buyCredits: false,
  setBuyCredits(): void {},
  transaction: null,
  amount: 0,
});

export default function ShopCoinflowContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { wallet, connection } = useWallet();

  const [transaction, setTransaction] = useState<VersionedTransaction | null>(
    null
  );
  const [buyCredits, setBuyCredits] = useState<boolean>(false);

  const amount = 20;

  const createNewMint = useCallback(async () => {
    if (!wallet || !wallet.publicKey || !connection) return;

    NftStoreConnectionService.setNet(SolanaNet.DEVNET);
    NftStoreConnectionService.setConfig(import.meta.env.VITE_RPC_URL, {
      commitment: "confirmed",
    });

    const tx = await buyEditionTx(
      wallet.publicKey,
      wallet.publicKey,
      new PublicKey("EJP43ENnxmjEMx75YHrYDJ8oJPkus7E2Zo5UWfoUtzgK")
    );

    const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
      units: 400_000,
    });

    const recentBlockhash =
      await NftStoreConnectionService.getConnection().getLatestBlockhash();

    const message = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: recentBlockhash.blockhash,
      instructions: [computeBudgetIx, ...tx.instructions],
    }).compileToV0Message([]);

    const vtx = new VersionedTransaction(message);

    setTransaction(vtx);
  }, [connection, wallet]);

  useEffect(() => {
    createNewMint().catch();
  }, [wallet, buyCredits, createNewMint]);

  return (
    <ShopCoinflowContext.Provider
      value={{
        transaction,
        amount,
        buyCredits,
        setBuyCredits,
      }}
    >
      {children}
    </ShopCoinflowContext.Provider>
  );
}

export const useShop = () => useContext(ShopCoinflowContext);
