import React, {ReactNode, useState} from 'react';
import './App.css';
import {useWallet, WalletContextProvider} from './wallet/Wallet';
import {BrowserRouter} from 'react-router-dom';
import ShopCoinflowContextProvider from './context/ShopCoinflowContext';
import {CoinflowForm} from './CoinflowForm';
import {DirectPurchaseForm} from './DirectPurchaseForm';
import {Button} from 'antd';

function App() {
  return (
    <ContextWrapper>
      <InputPanel />
    </ContextWrapper>
  );
}

function InputPanel() {
  const [buyCredits, setBuyCredits] = useState(false);

  return (
    <ShopCoinflowContextProvider>
      <div className={'w-full h-full flex flex-center'}>
        <DirectPurchaseForm
          buyCredits={buyCredits}
          setBuyCredits={setBuyCredits}
        />
        <Content buyCredits={buyCredits} />
      </div>
    </ShopCoinflowContextProvider>
  );
}

function Content({buyCredits}: {buyCredits: boolean}) {
  const {publicKey} = useWallet();

  if (!publicKey) return <LoginForm />;

  return <CoinflowForm buyCredits={buyCredits} />;
}

function LoginForm() {
  const {connect} = useWallet();
  return (
    <div className={'flex flex-col items-center justify-center w-4/5'}>
      <Button
        type="primary"
        onClick={connect}
        size={'large'}
        style={{background: '#73c2fb'}}
      >
        Login to Purchase
      </Button>
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
