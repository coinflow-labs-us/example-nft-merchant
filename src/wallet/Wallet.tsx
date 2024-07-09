import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Connection, PublicKey, Transaction} from '@solana/web3.js';
import {useMetakeepWallet} from '../hooks/useMetakeepWallet';
import {MetaKeep} from 'metakeep';

export interface WalletContextProps {
  publicKey: PublicKey | null;
  connection: Connection | null;
  sendTransaction: (transaction: Transaction) => Promise<string>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
  connect: (email: string) => Promise<MetaKeep | null>;
  disconnect: () => void;
  initialized: boolean;
}

const WalletContext = createContext<WalletContextProps>({
  disconnect(): void {},
  connect(): Promise<MetaKeep | null> {
    return Promise.resolve(null);
  },
  publicKey: null,
  connection: null,
  sendTransaction: () => Promise.reject(new Error('')),
  signTransaction: () => Promise.reject(new Error('')),
  signMessage: () => Promise.reject(new Error('')),
  initialized: false,
});

export function WalletContextProvider({children}: {children: ReactNode}) {
  const {
    publicKey,
    sendTransaction,
    signTransaction,
    signMessage,
    connection,
    connect,
    disconnect,
    initialized,
  } = useMetakeepWallet();

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        sendTransaction,
        signMessage,
        connection,
        signTransaction,
        connect,
        disconnect,
        initialized,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
