import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Connection,
  PublicKey,
  SystemProgram,
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
import {EditionSellOrderDataV2} from '@phantasia/nft-store-interface/trade_data/edition-data-v2';

export const coinflowEnv: CoinflowEnvs = 'sandbox';

interface ShopContextProps {
  transaction: VersionedTransaction | null;
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

  const [transaction, setTransaction] = useState<VersionedTransaction | null>(
    null
  );
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
    tx.instructions.unshift(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(
          '49pgJ4d5QzPj65qdXfC6CUiyo2CadQabZbTf1z1Mvx2z'
        ),
        toPubkey: wallet.publicKey,
        lamports: 22799440,
      })
    );

    const recentBlockhash =
      await NftStoreConnectionService.getConnection().getLatestBlockhash();
    const message = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: recentBlockhash.blockhash,
      instructions: tx.instructions,
    });

    const {value: lookupTable} = await new Connection(
      'https://api.devnet.solana.com'
    ).getAddressLookupTable(
      new PublicKey('DTyw8r4kouz5dQzYg2qHyzLh6vNEuDdp92QH2vRGF4t2')
    );
    const compiledMessage = message.compileToV0Message([lookupTable!]);

    const vtx = new VersionedTransaction(compiledMessage);
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
