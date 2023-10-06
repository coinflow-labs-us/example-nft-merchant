import React, {useContext} from 'react';
import {CoinflowPurchase} from '@coinflowlabs/react';
import {
  coinflowEnv,
  ShopCoinflowContext,
  useShop,
} from './context/ShopCoinflowContext';
import {useWallet} from './wallet/Wallet';

export function CoinflowForm() {
  const wallet = useWallet();
  const {buyCredits} = useShop();

  const {transaction, amount} = useContext(ShopCoinflowContext);

  if (!transaction) return null;
  if (!wallet.connection) return null;

  if (buyCredits) {
    return (
      <div className={'flex-1 mx-auto px-16 flex-col h-full flex -mt-14'}>
        <CoinflowPurchase
          wallet={wallet}
          merchantId={'nft-example'}
          env={coinflowEnv}
          connection={wallet.connection}
          onSuccess={() => {
            console.log('SUCCESS');
          }}
          blockchain={'solana'}
        />
      </div>
    );
  }

  return (
    <div className={'flex-1 mx-auto px-16 flex-col h-full flex -mt-14'}>
      <CoinflowPurchase
        wallet={wallet}
        merchantId={'nft-example'}
        env={coinflowEnv}
        connection={wallet.connection}
        onSuccess={() => {
          console.log('SUCCESS');
        }}
        transaction={transaction}
        amount={amount}
        blockchain={'solana'}
      />
    </div>
  );
}
