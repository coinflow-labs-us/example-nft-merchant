import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Transaction} from '@solana/web3.js';
import {CoinflowEnvs} from '@coinflowlabs/react';
import {useWallet} from '../wallet/Wallet';
import {ADMIN_WALLET, SOLANA_CONNECTION} from '../index';
import {sendUsdc} from '../SendUsdc';

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

export default function ShopCoinflowContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallet = useWallet();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [buyCredits, setBuyCredits] = useState<boolean>(false);

  const amount = 20;

  const createNewMint = useCallback(async () => {
    if (!wallet || !wallet.publicKey) return;

    const tx = await sendUsdc(wallet.publicKey, ADMIN_WALLET.publicKey, amount);

    const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash(
      'confirmed'
    );

    tx.recentBlockhash = await latestBlockHash.blockhash;

    setTransaction(tx);
  }, [wallet, amount]);

  useEffect(() => {
    createNewMint().catch();
  }, [wallet, buyCredits]);

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
