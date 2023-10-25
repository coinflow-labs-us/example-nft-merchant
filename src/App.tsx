import React, {ReactNode, useEffect} from 'react';
import './App.css';
import {useWallet, WalletContextProvider} from './wallet/Wallet';
import {BrowserRouter} from 'react-router-dom';
import ShopCoinflowContextProvider from './context/ShopCoinflowContext';
import {CoinflowForm} from './CoinflowForm';
import {DirectPurchaseForm} from './DirectPurchaseForm';
import {Header} from './Header';
import Joyride from 'react-joyride';
import {TourTooltip} from './TourTooltip';
import {useTour} from './context/useTour';

export const focusedNft = {
  image:
    'https://opengameart.org/sites/default/files/short_sword_game_item.jpg',
  name: 'Test NFT',
};

function App() {
  return (
    <ContextWrapper>
      <TourComponent />
      <ShopCoinflowContextProvider>
        <div className={'w-full flex flex-col h-screen relative bg-white'}>
          <div
            className={
              'flex flex-col lg:flex-row max-h-none h-auto lg:max-h-screen lg:h-screen w-full flex-1'
            }
          >
            <DirectPurchaseForm />
            <div
              className={
                'flex flex-col flex-1 bg-white overflow-auto h-screen static lg:relative'
              }
            >
              <Header />
              <Content />
            </div>
          </div>
        </div>
      </ShopCoinflowContextProvider>
    </ContextWrapper>
  );
}

function TourComponent() {
  const {skipTour, steps} = useTour();

  return (
    <Joyride
      run={!skipTour}
      tooltipComponent={TourTooltip}
      steps={steps}
      showSkipButton
      showProgress
      scrollToFirstStep
      continuous
    />
  );
}

function Content() {
  const {publicKey} = useWallet();

  if (!publicKey) return <LoginForm />;

  return <CoinflowForm />;
}

function LoginForm() {
  const {connect} = useWallet();
  return (
    <div className={'bg-zinc-200 lg:bg-white flex flex-1'}>
      <div
        className={
          'flex flex-col items-center justify-center flex-1 rounded-t-3xl bg-white w-full h-full shadow-2xl lg:shadow-none'
        }
      >
        <div
          className={
            'joyride-step-3 bg-blue-400 rounded-2xl p-5 px-7 hover:bg-blue-500 transition cursor-pointer'
          }
          onClick={connect}
        >
          <span className={'text-sm font-semibold text-slate-900'}>
            Login to Purchase
          </span>
        </div>
      </div>
    </div>
  );
}

function ContextWrapper({children}: {children: ReactNode}) {
  return (
    <div
      className={'flex flex-col items-center justify-center h-screen w-screen'}
    >
      <WalletContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </WalletContextProvider>
    </div>
  );
}

export default App;
