import React, {useContext} from 'react';
import {CoinflowPurchase} from '@coinflowlabs/react';
import {
  coinflowEnv,
  ShopCoinflowContext,
  useShop,
} from './context/ShopCoinflowContext';
import {useWallet} from './wallet/Wallet';
import {ADMIN_WALLET, SOLANA_CONNECTION} from './index';
import {keypairIdentity, Metaplex, token} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';

export function CoinflowForm() {
  const wallet = useWallet();
  const {buyCredits} = useShop();

  const {transaction, amount} = useContext(ShopCoinflowContext);

  if (!transaction) return null;
  if (!wallet.connection) return null;

  const METAPLEX = Metaplex.make(SOLANA_CONNECTION).use(
    keypairIdentity(ADMIN_WALLET)
  );

  async function onSuccess() {
    const res = await METAPLEX.nfts().create({
      uri: 'https://shdw-drive.genesysgo.net/Fwa7houxcUtTKGf1egRUVowgax5zzNLFYkPvggLYexeo/metadata.json',
      name: 'Sword',
      sellerFeeBasisPoints: 0,
      symbol: 'SWRD',
      creators: [
        {
          address: new PublicKey(
            '63zH5fKvSubyforhkAJEWwaeEUoLe8R864bETRLMrX1t'
          ),
          share: 100,
        },
      ],
      isMutable: false,
    });

    if (wallet.publicKey) {
      const {response} = await METAPLEX.nfts().transfer({
        nftOrSft: res.nft,
        authority: ADMIN_WALLET,
        fromOwner: ADMIN_WALLET.publicKey,
        toOwner: wallet.publicKey,
        amount: token(1),
      });
      console.log('Success! Signature: ', response.signature);
    }
  }

  if (buyCredits) {
    return (
      <div className={'flex-1 mx-auto px-16 flex-col h-full flex -mt-14'}>
        <CoinflowPurchase
          wallet={wallet}
          merchantId={'nft-example'}
          env={coinflowEnv}
          connection={wallet.connection}
          onSuccess={() => {
            console.log('SUCCESS');
          }}
          blockchain={'solana'}
        />
      </div>
    );
  }

  return (
    <div className={'flex-1 mx-auto px-16 flex-col h-full flex -mt-14'}>
      <CoinflowPurchase
        wallet={wallet}
        merchantId={'nft-example'}
        env={coinflowEnv}
        connection={wallet.connection}
        onSuccess={onSuccess}
        transaction={transaction}
        amount={amount}
        blockchain={'solana'}
      />
    </div>
  );
}
