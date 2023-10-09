import React from 'react';
import {useWallet} from './wallet/Wallet';
import {useShop} from './context/ShopCoinflowContext';

export function DirectPurchaseForm() {
  const {publicKey, disconnect} = useWallet();
  const {buyCredits, setBuyCredits} = useShop();

  const focusedNft = {
    image:
      'https://opengameart.org/sites/default/files/short_sword_game_item.jpg',
    name: 'Test NFT',
  };

  return (
    <div
      className={
        'flex-col w-2/5 max-w-[550px] bg-base-1 overflow-hidden relative border-r-[0.5px] border-black/10 h-screen'
      }
    >
      <img
        src={focusedNft.image}
        alt={'nft'}
        className={'absolute object-cover top-0 left-0 bottom-0 right-0'}
      />
      <div
        className={
          'backdrop-blur-2xl bg-white/30 flex flex-col z-50 p-16 flex-1 h-screen'
        }
      >
        <div className={'flex-col space-y-5 justify-center align-center'}>
          <div className={'flex flex-row items-center space-x-2'}>
            <img
              src={
                'https://static.wikia.nocookie.net/aqwikia/images/c/ca/Sword_Master_Emblem.png'
              }
              alt={'nft'}
              className={'w-6 object-contain'}
            />
            <span className={'font-extrabold text-slate-900 text-lg flex-1'}>
              Battle Brawlers
            </span>

            <div
              onClick={() => setBuyCredits(!buyCredits)}
              className={
                'backdrop-blur-2xl cursor-pointer font-semibold text-slate-900 text-xs bg-white/10 hover:bg-white/100 transition rounded-full p-2 px-3'
              }
            >
              {buyCredits ? 'Buy NFT' : 'Buy Credits'}
            </div>
            {publicKey && (
              <div
                onClick={disconnect}
                className={
                  'backdrop-blur-2xl cursor-pointer font-semibold text-slate-900 text-xs bg-white/10 hover:bg-white/100 transition rounded-full p-2 px-3'
                }
              >
                Logout
              </div>
            )}
          </div>

          <div className={'p-2 rounded-2xl shadow-2xl'}>
            <img
              src={focusedNft.image}
              alt={'nft'}
              className={'w-full rounded-lg'}
            />
          </div>
        </div>

        <SupplyIndicator />

        <Total />
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="flex flex-col mt-6 items-end flex-1 justify-end">
      <span className="text-xs text-zinc-500">Price</span>
      <span className="text-slate-900 font-extrabold text-4xl">$20.00</span>
    </div>
  );
}

function SupplyIndicator() {
  return (
    <>
      <span className="font-extrabold text-xl text-slate-900 mt-8">
        Basic Sword
      </span>

      <div className={'flex space-x-5 items-center -ml-3 mt-3'}>
        <div
          className={'flex space-x-2 items-center rounded-full p-3 bg-zinc-100'}
        >
          <span className={'text-base'}>🔥</span>
          <span className={'text-sm font-semibold text-slate-900'}>
            Damage:{' '}
          </span>
          <span className={'text-sm font-bold text-emerald-600'}>1x</span>
        </div>
        <div
          className={'flex space-x-2 items-center rounded-full p-3 bg-zinc-100'}
        >
          <span className={'text-base'}>🧱</span>
          <span className={'text-sm font-semibold text-slate-900'}>
            Weight:
          </span>
          <span className={'text-sm font-bold text-emerald-600'}>2x</span>
        </div>
      </div>
    </>
  );
}
