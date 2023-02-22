import React from 'react';

export function HorizontalDivider({className}: {className: string}) {
  return (
    <div
      className={`flex-grow h-1 min-h-1 ${className}`}
      style={{background: 'var(--ring-color)'}}
    />
  );
}

export function DirectPurchaseForm() {
  const focusedNft = {
    image:
      'https://opengameart.org/sites/default/files/short_sword_game_item.jpg',
    name: 'Test NFT',
  };

  return (
    <div className={'flex-col w-30 bg-base-1 p-8 drop-shadow-md bg-slate-100'}>
      <div className={'flex-row space-x-5 justify-center align-center'}>
        <img
          src={focusedNft.image}
          alt={'nft'}
          className={'w-60 h-60 rounded-lg'}
        />
        <div className={'flex-col'}>
          <SupplyIndicator />
        </div>
      </div>
      <HorizontalDivider className={'my-8'} />
      <div className="flex-col w-full">
        <HorizontalDivider className={'my-8'} />
        <Total />
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="flex-row items-baseline mb-8">
      <span className="font-xl text-neutral-2 weight-300">Price</span>
      <span className="flex-grow" />
      <span
        className="text-neutral-2 weight-700 flex items-center bg-base-2 rounded-4"
        style={{
          fontSize: 'calc(12px + 1.5vw)',
          paddingRight: '20px',
        }}
      >
        <i className={'text-neutral-2 bx bx-dollar'} />
        {' 1.00'}
      </span>
    </div>
  );
}

function SupplyIndicator() {
  return (
    <span className="font-md font-semibold">
      Basic Sword - {1000} available
    </span>
  );
}
