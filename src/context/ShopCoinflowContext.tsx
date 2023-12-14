import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ComputeBudgetInstruction,
  ComputeBudgetProgram,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import {CoinflowEnvs} from '@coinflowlabs/react';
import {useWallet} from '../wallet/Wallet';
import {buyEditionTx} from '@phantasia/nft-store-interface/transactions/edition_sale/buy-edition-tx';
import {
  NftStoreConnectionService,
  SolanaNet,
} from '@phantasia/nft-store-interface';
import {RPC_URL} from '../index';

export const coinflowEnv: CoinflowEnvs = 'sandbox';

interface ShopContextProps {
  transaction: VersionedTransaction | null;
  amount: number;
  buyCredits: boolean;
  setBuyCredits: (b: boolean) => void;
}

export const ShopCoinflowContext = React.createContext<ShopContextProps>({
  buyCredits: false,
  setBuyCredits(_: boolean): void {},
  transaction: null,
  amount: 0,
});

export default function ShopCoinflowContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallet = useWallet();

  const [transaction, setTransaction] = useState<VersionedTransaction | null>(
    null
  );
  const [buyCredits, setBuyCredits] = useState<boolean>(false);

  const amount = 20;

  const createNewMint = useCallback(async () => {
    if (!wallet || !wallet.publicKey) return;

    NftStoreConnectionService.setNet(SolanaNet.DEVNET);
    NftStoreConnectionService.setConfig(RPC_URL, {
      commitment: 'confirmed',
    });

    const tx = await buyEditionTx(
      wallet.publicKey,
      wallet.publicKey,
      new PublicKey('EJP43ENnxmjEMx75YHrYDJ8oJPkus7E2Zo5UWfoUtzgK')
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
