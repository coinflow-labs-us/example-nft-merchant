import React, { useContext } from "react";
import { CoinflowPurchase } from "@coinflowlabs/react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {ShopCoinflowContext} from "./context/ShopCoinflowContext";

export function CoinflowForm() {
  const wallet = useWallet();
  const {connection} = useConnection();

  const { transaction, amount } =
    useContext(ShopCoinflowContext);

  if (!transaction) return null;

  return (
    <div className={`w-4/5 mx-auto px-8 flex-col h-full`}>
      <CoinflowPurchase
        wallet={wallet}
        merchantId={"nft-example"}
        env={'sandbox'}
        connection={connection}
        onSuccess={() => {console.log('SUCCESS')}}
        transaction={transaction}
        amount={amount}
        blockchain={'solana'}
      />
    </div>
  );
}
