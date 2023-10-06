import React, {ReactNode} from 'react';
import './App.css';
import {useWallet, WalletContextProvider} from './wallet/Wallet';
import {BrowserRouter} from 'react-router-dom';
import ShopCoinflowContextProvider from './context/ShopCoinflowContext';
import {CoinflowForm} from './CoinflowForm';
import {DirectPurchaseForm} from './DirectPurchaseForm';

function App() {
  return (
    <ContextWrapper>
      <ShopCoinflowContextProvider>
        <div className={'w-full flex flex-center h-screen'}>
          <DirectPurchaseForm />
          <Content />
        </div>
      </ShopCoinflowContextProvider>
    </ContextWrapper>
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
    <div className={'flex flex-col items-center justify-center w-4/5'}>
      <div
        className={
          'bg-blue-600 rounded-2xl p-5 px-7 hover:bg-blue-500 transition cursor-pointer'
        }
        onClick={connect}
      >
        <span className={'text-sm font-semibold text-white'}>
          Login to Purchase
        </span>
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
