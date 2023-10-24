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
        'flex-col flex space-y-2 fixed lg:sticky z-50 top-0 right-0 left-0 items-center'
      }
    >
      <div
        className={`${
          !showHeader
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-gray-950/50 backdrop-blur-2xl backdrop-filter'
        } lg:backdrop-blur-2xl transition-all backdrop-filter-none lg:backdrop-filter duration-500 lg:bg-gray-950/50 p-5 flex w-full items-center space-x-4 px-5 lg:px-16`}
      >
        <img
          src={
            'https://static.wikia.nocookie.net/aqwikia/images/c/ca/Sword_Master_Emblem.png'
          }
          alt={'nft'}
          className={'w-6 object-contain'}
        />
        <span
          className={'font-extrabold text-gray-50 text-sm lg:text-lg flex-1'}
        >
          Battle Brawlers
        </span>

        <div className={'joyride-step-4'}>
          <OutlineButton onClick={() => setBuyCredits(!buyCredits)}>
            {buyCredits ? 'Buy NFT' : 'Buy Credits'}
          </OutlineButton>
        </div>
        {publicKey && (
          <OutlineButton onClick={disconnect}>Logout</OutlineButton>
        )}
      </div>

      <div
        className={`${
          showHeader ? 'opacity-100' : 'opacity-0'
        } lg:opacity-0 bg-gray-950/90 fade-in backdrop-blur-2xl flex lg:hidden items-center space-x-2 p-2 rounded-full`}
      >
        <img
          src={focusedNft.image}
          alt={'nft'}
          className={'w-7 h-7 rounded-full'}
        />
        <span className={'text-sm font-bold text-gray-50'}>$20.00</span>
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
        'backdrop-blur-2xl cursor-pointer ring-white/10 ring-[0.5px] font-semibold text-gray-50 text-xs bg-gray-900/40 hover:bg-gray-900/100 transition rounded-full p-3 px-4'
      }
    >
      {children}
    </div>
  );
}
