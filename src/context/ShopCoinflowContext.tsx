import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PublicKey, Transaction} from '@solana/web3.js';
import {CoinflowEnvs} from '@coinflowlabs/react';
import {useWallet} from '../wallet/Wallet';
import {buyEditionTx} from '@phantasia/nft-store-interface/transactions/edition_sale/buy-edition-tx';
import {
  NftStoreConnectionService,
  SolanaNet,
} from '@phantasia/nft-store-interface';
import {EditionSellOrderDataV2} from '@phantasia/nft-store-interface/trade_data/edition-data-v2';

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

    NftStoreConnectionService.setNet(SolanaNet.DEVNET);
    NftStoreConnectionService.setConfig('https://api.devnet.solana.com', {
      commitment: 'confirmed',
    });

    const account = await EditionSellOrderDataV2.fromAccount(
      new PublicKey('Ep7RAdmA46AQNLJh38qWrdC2zEUbc5Z2aKPCvDCWTmoj')
    );
    console.log({sellingPrice: account.sellingPrice.toNumber()});

    const tx = await buyEditionTx(
      wallet.publicKey,
      wallet.publicKey,
      new PublicKey('EJP43ENnxmjEMx75YHrYDJ8oJPkus7E2Zo5UWfoUtzgK')
    );

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
