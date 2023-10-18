import React, {useCallback, useContext, useEffect, useState} from 'react';
import {CoinflowPurchase} from '@coinflowlabs/react';
import {
  coinflowEnv,
  ShopCoinflowContext,
  useShop,
} from './context/ShopCoinflowContext';
import {useWallet} from './wallet/Wallet';
import {ADMIN_WALLET, METAPLEX} from './index';
import {token} from '@metaplex-foundation/js';
import {PublicKey} from '@solana/web3.js';

export function CoinflowForm() {
  const wallet = useWallet();
  const {buyCredits} = useShop();

  const [height, setHeight] = useState<number>(0);
  const [handleHeightChange, setHandleHeightChange] = useState<
    ((newHeight: string) => void) | undefined
  >(undefined);

  const handleHeight = useCallback((newHeight: string) => {
    setHeight(Number(newHeight));
  }, []);

  useEffect(() => {
    if (wallet.publicKey) {
      setHandleHeightChange(() => handleHeight);
    }
  }, [handleHeight, wallet]);

  const {transaction, amount} = useContext(ShopCoinflowContext);

  const onSuccess = useCallback(async () => {
    console.log('Public key', wallet.publicKey?.toString());
    console.log('ADMIN', ADMIN_WALLET.publicKey.toString());

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

    console.log({res});

    console.log('Public key', wallet.publicKey?.toString());

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
  }, [wallet, ADMIN_WALLET]);

  if (!transaction) return null;
  if (!wallet.connection) return null;

  if (buyCredits) {
    return (
      <div className={'bg-zinc-200 w-full'}>
        <div
          className={'overflow-auto flex-1 mx-auto px-16 py-10 rounded-t-4xl'}
        >
          <div
            style={{height: `${height}px`}}
            className={'flex-col h-full flex'}
          >
            <CoinflowPurchase
              wallet={wallet}
              merchantId={'nft-example'}
              env={coinflowEnv}
              connection={wallet.connection}
              onSuccess={() => {
                console.log('SUCCESS');
              }}
              blockchain={'solana'}
              handleHeightChange={handleHeightChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'bg-zinc-200 lg:bg-white w-full flex-1'}>
      <div
        className={
          'overflow-auto h-auto lg:h-screen  px-0 lg:px-16 flex-1 w-full py-10 rounded-t-[30px] bg-white'
        }
      >
        <div
          style={{height: `${height}px`}}
          className={
            'flex-col h-full flex -mt-24 lg:mt-0 max-w-[700px] mx-auto'
          }
        >
          <CoinflowPurchase
            handleHeightChange={handleHeightChange}
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
      </div>
    </div>
  );
}
