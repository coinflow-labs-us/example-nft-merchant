import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'boxicons';
import {
  NftStoreConnectionService,
  SolanaNet,
} from '@phantasia/nft-store-interface';
import {Connection, Keypair} from '@solana/web3.js';
import bs58 from 'bs58';
import {keypairIdentity, Metaplex} from '@metaplex-foundation/js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

NftStoreConnectionService.setNet(SolanaNet.DEVNET);

const burnerWalletSecretKey =
  'bWn2NgsM9fY4kV4DgKMvnv26qaPiHNJHL973Jek8gP2Xzt6HtvGT34vMj28uyXk7CtzJWYuFC2B4NtuLKr2gd63';

export const SOLANA_CONNECTION = new Connection(
  'https://rpc-devnet.helius.xyz/?api-key=2f915565-3608-4451-9150-4e72f50f10c2'
);
export const ADMIN_WALLET = Keypair.fromSecretKey(
  bs58.decode(burnerWalletSecretKey)
);

export const METAPLEX = Metaplex.make(SOLANA_CONNECTION).use(
  keypairIdentity(ADMIN_WALLET)
);

console.log(ADMIN_WALLET.publicKey.toString());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
