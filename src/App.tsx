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
      <InputPanel />
    </ContextWrapper>
  );
}

function InputPanel() {
  const {connect, publicKey} = useWallet();

  return (
    <>
      <div className={'flex flex-row space-x-1'}>
        <button onClick={connect} className="card">
          Login
        </button>
        <span>{publicKey?.toString()}</span>
      </div>
      <ShopCoinflowContextProvider>
        <div className={'w-full h-full flex flex-center'}>
          <DirectPurchaseForm />
          <CoinflowForm />
        </div>
      </ShopCoinflowContextProvider>
    </>
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
