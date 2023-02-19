import React, {ReactNode} from 'react';
import './App.css';
import {Wallet} from './wallet/Wallet';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {BrowserRouter} from 'react-router-dom';
import ShopCoinflowContextProvider from "./context/ShopCoinflowContext";
import {CoinflowForm} from "./CoinflowForm";
import {DirectPurchaseForm} from "./DirectPurchaseForm";

function App() {
  return (
    <ContextWrapper>
      <InputPanel />
    </ContextWrapper>
  );
}

function InputPanel() {
  return (
    <>
    <div className={'flex flex-row space-x-1'}>
      <WalletMultiButton />
    </div>
  <ShopCoinflowContextProvider>
    <div className={"w-full h-full flex flex-center"}>
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
      <Wallet>
          <BrowserRouter>{children}</BrowserRouter>
      </Wallet>
    </div>
  );
}

export default App;
