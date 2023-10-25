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
import {NftSuccessModal} from './modals/NftSuccessModal';
import {CreditsSuccessModal} from './modals/CreditsSuccessModal';

export function CoinflowForm() {
  const wallet = useWallet();
  const {buyCredits} = useShop();

  const [creditSuccessOpen, setCreditSuccessOpen] = useState<boolean>(false);
  const [nftSuccessOpen, setNftSuccessOpen] = useState<boolean>(false);

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

  const mintAndSendNft = useCallback(
    async (retry: number) => {
      try {
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
        console.log('Mint complete', res);

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
      } catch (e) {
        console.error(e);
        if (retry <= 2) await mintAndSendNft(retry + 1);
      }
    },
    [ADMIN_WALLET, METAPLEX]
  );

  const onNftSuccess = useCallback(async () => {
    setTimeout(() => {
      setNftSuccessOpen(true);
    }, 1200);

    await mintAndSendNft(0);
  }, [wallet, ADMIN_WALLET, METAPLEX]);

  if (!transaction) return null;
  if (!wallet.connection) return null;

  if (buyCredits) {
    return (
      <div className={'bg-zinc-200 lg:bg-white w-full flex-1'}>
        <div
          className={
            'overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full rounded-t-[30px] bg-white'
          }
        >
          <div
            style={{height: `${height}px`}}
            className={'flex-col h-full flex lg:-mt-12 -mt-12 mx-auto'}
          >
            <CoinflowPurchase
              wallet={wallet}
              merchantId={'nft-example'}
              env={coinflowEnv}
              connection={wallet.connection}
              onSuccess={() => {
                setTimeout(() => {
                  setCreditSuccessOpen(true);
                }, 1200);
              }}
              blockchain={'solana'}
              handleHeightChange={handleHeightChange}
            />
          </div>
        </div>
        <CreditsSuccessModal
          isOpen={creditSuccessOpen}
          setIsOpen={setCreditSuccessOpen}
        />
      </div>
    );
  }

  return (
    <div className={'bg-zinc-200 lg:bg-white w-full flex-1'}>
      <div
        className={
          'overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full rounded-t-[30px] bg-white'
        }
      >
        <div
          style={{height: `${height}px`}}
          className={'flex-col h-full flex lg:-mt-12 -mt-10 mx-auto'}
        >
          <CoinflowPurchase
            handleHeightChange={handleHeightChange}
            wallet={wallet}
            merchantId={'nft-example'}
            env={coinflowEnv}
            connection={wallet.connection}
            onSuccess={onNftSuccess}
            transaction={transaction}
            amount={amount}
            blockchain={'solana'}
          />
        </div>
      </div>
      <NftSuccessModal isOpen={nftSuccessOpen} setIsOpen={setNftSuccessOpen} />
    </div>
  );
}
