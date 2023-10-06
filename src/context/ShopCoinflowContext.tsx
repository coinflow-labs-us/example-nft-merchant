import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {ComputeBudgetProgram, PublicKey, Transaction} from '@solana/web3.js';
import {buyEditionTx} from '@phantasia/nft-store-interface';
import {CoinflowEnvs} from '@coinflowlabs/react';
import {useWallet} from '../wallet/Wallet';

export const coinflowEnv: CoinflowEnvs = 'sandbox';

interface ShopContextProps {
  transaction: Transaction | null;
  amount: number;
  buyCredits: boolean;
  setBuyCredits: (b: boolean) => void;
}

export const ShopCoinflowContext = React.createContext<ShopContextProps>({
  buyCredits: false,
  setBuyCredits(b: boolean): void {},
  transaction: null,
  amount: 0,
});

const nftMint = new PublicKey(
  'CGcdDT1GCJkndyX8twPp3Jo9rg5xw3a8RNsKpQVGQWYQ'
).toString();

export default function ShopCoinflowContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallet = useWallet();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [buyCredits, setBuyCredits] = useState<boolean>(false);

  const setPurchaseEditionTx = useCallback(async () => {
    if (!wallet.publicKey) return;
    const feePayer = new PublicKey(
      '49pgJ4d5QzPj65qdXfC6CUiyo2CadQabZbTf1z1Mvx2z'
    );

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
  }, [wallet.publicKey, buyCredits]);

  useEffect(() => {
    setPurchaseEditionTx().catch(console.error);
  }, [wallet, buyCredits]);

  const amount = 20;

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
