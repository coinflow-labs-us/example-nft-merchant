import React, {ReactNode, useEffect, useState} from 'react';
import {useWallet} from './wallet/Wallet';
import {useShop} from './context/ShopCoinflowContext';
import {focusedNft} from './App';

export function Header() {
  const {publicKey, disconnect} = useWallet();
  const {buyCredits, setBuyCredits} = useShop();

  const [showHeader, setShowHeader] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setShowHeader(true);
    } else if (scrollTop <= 50) {
      setShowHeader(false);
    }
  }

  return (
    <div
      className={
        'flex-col flex space-y-2 fixed z-50 top-0 right-0 left-0 items-center'
      }
    >
      <div
        className={`${
          !showHeader
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-white/80 ring-[0.5px] backdrop-blur-2xl'
        } lg:backdrop-blur-2xl transition-all duration-500 lg:bg-white/80 p-5 flex w-full items-center space-x-4 px-5 lg:px-16 lg:ring-[0.5px] ring-black/10`}
      >
        <img
          src={
            'https://static.wikia.nocookie.net/aqwikia/images/c/ca/Sword_Master_Emblem.png'
          }
          alt={'nft'}
          className={'w-6 object-contain'}
        />
        <span
          className={'font-extrabold text-slate-900 text-sm lg:text-lg flex-1'}
        >
          Battle Brawlers
        </span>

        <OutlineButton onClick={() => setBuyCredits(!buyCredits)}>
          {buyCredits ? 'Buy NFT' : 'Buy Credits'}
        </OutlineButton>
        {publicKey && (
          <OutlineButton onClick={disconnect}>Logout</OutlineButton>
        )}
      </div>

      <div
        className={`${
          showHeader ? 'opacity-100' : 'opacity-0'
        } lg:opacity-0 bg-white/90 fade-in backdrop-blur-2xl flex items-center space-x-2 p-2 rounded-full`}
      >
        <img
          src={focusedNft.image}
          alt={'nft'}
          className={'w-7 h-7 rounded-full'}
        />
        <span className={'text-sm font-bold text-slate-900'}>$20.00</span>
      </div>
    </div>
  );
}

function OutlineButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={
        'backdrop-blur-2xl cursor-pointer ring-black/10 ring-[0.5px] font-semibold text-slate-900 text-xs bg-white/20 hover:bg-white/100 transition rounded-full p-3 px-4'
      }
    >
      {children}
    </div>
  );
}
