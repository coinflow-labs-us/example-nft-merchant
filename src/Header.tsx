import React, {ReactNode, useEffect, useState} from 'react';
import {useWallet} from './wallet/Wallet';
import {useShop} from './context/ShopCoinflowContext';
import {focusedNft} from './App';
import {TestCardsModal} from './modals/TestCardsModal';

export function Header() {
  const {publicKey, disconnect} = useWallet();
  const {buyCredits, setBuyCredits} = useShop();

  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [testCardsOpen, setTestCardsOpen] = useState<boolean>(false);

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
        'flex-col flex space-y-2 fixed lg:sticky z-40 top-0 right-0 left-0 items-center'
      }
    >
      <div
        className={`${
          !showHeader
            ? 'bg-transparent backdrop-blur-none backdrop-filter-none'
            : 'bg-white/60 backdrop-blur-xl backdrop-filter'
        } lg:backdrop-blur-2xl transition-all lg:backdrop-filter duration-500 lg:bg-white/50 p-5 flex w-full items-center space-x-4 px-5 lg:px-16`}
      >
        <img
          src={
            'https://static.wikia.nocookie.net/aqwikia/images/c/ca/Sword_Master_Emblem.png'
          }
          alt={'nft'}
          className={'w-6 object-contain'}
        />
        <span
          className={
            'hidden lg:flex font-extrabold text-slate-900 text-sm lg:text-lg'
          }
        >
          Battle Brawlers
        </span>
        <div className={'flex-1'} />

        <div className={'joyride-step-5'}>
          <OutlineButton onClick={() => setTestCardsOpen(true)}>
            <span>Test Cards</span>
            <i className={'bx bx-chevron-down ml-1'} />
          </OutlineButton>
        </div>
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
        } lg:opacity-0 bg-zinc-100/90 shadow-xl fade-in backdrop-blur-2xl flex lg:hidden items-center space-x-2 p-2 rounded-full`}
      >
        <img
          src={focusedNft.image}
          alt={'nft'}
          className={'w-7 h-7 rounded-full'}
        />
        <span className={'text-sm font-bold text-slate-900'}>$20.00</span>
      </div>
      <TestCardsModal isOpen={testCardsOpen} setIsOpen={setTestCardsOpen} />
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
        'cursor-pointer flex items-center font-semibold text-gray-700 text-xs hover:text-slate-900 transition py-3'
      }
    >
      {children}
    </div>
  );
}
