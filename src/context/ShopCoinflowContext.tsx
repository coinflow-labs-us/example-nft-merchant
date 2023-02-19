import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {ComputeBudgetProgram, PublicKey, Transaction} from "@solana/web3.js";
import {buyEditionTx} from "@phantasia/nft-store-interface";
import {useWallet} from "@solana/wallet-adapter-react";
import {CoinflowUtils} from "@coinflowlabs/react";

interface ShopContextProps {
  transaction: Transaction | null;
  amount: number;
}

export const ShopCoinflowContext = React.createContext<ShopContextProps>({
  transaction: null,
  amount: 0,
});

const nftMint = new PublicKey('CGgncguPSzgx5nPd5M5YCsCcLagDmwfSZWtuWrfqP5vT').toString(); // TODO

export default function ShopCoinflowContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallet = useWallet();

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const getFeePayer = useCallback(() => {
    return new CoinflowUtils('sandbox').getFeePayer(
      "nft-example"
    )
  }, []);

  const setPurchaseEditionTx = useCallback(async () => {
    if (!wallet.publicKey) return;
    const feePayer = await getFeePayer();

    const transaction = await buyEditionTx(
      feePayer,
      wallet.publicKey,
      new PublicKey(nftMint)
    );
    const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
      units: 400_000,
    });
    transaction.instructions.unshift(computeBudgetIx);

    setTransaction(transaction);
  }, [getFeePayer, wallet.publicKey]);

  useEffect(() => {
    setPurchaseEditionTx();
  }, [setPurchaseEditionTx]);

  const amount = 1;

  return (
    <ShopCoinflowContext.Provider
      value={{
        transaction,
        amount
      }}
    >
      {children}
    </ShopCoinflowContext.Provider>
  );
}
