import React from 'react';
import {focusedNft} from './App';

export function DirectPurchaseForm() {
  return (
    <div
      className={
        'bg-zinc-200 lg:bg-white flex flex-col h-auto lg:h-screen max-w-full w-full lg:w-2/5 lg:max-w-[550px] bg-base-1 overflow-hidden relative'
      }
    >
      <div
        className={
          ' bg-transparent lg:bg-zinc-100 flex flex-col z-30 p-9 lg:p-16 flex-1 h-full pt-20 lg:pt-12'
        }
      >
        <div className={'flex-col space-y-5 justify-center align-center'}>
          <div
            className={
              'p-2 rounded-2xl shadow-2xl bg-zinc-50 backdrop-blur-2xl joyride-step-1'
            }
          >
            <img
              src={focusedNft.image}
              alt={'nft'}
              className={'w-full rounded-lg'}
            />
          </div>
        </div>

        <SupplyIndicator />
        <Total />
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="flex flex-col mt-6 items-end flex-1 justify-end ">
      <span className="text-xs text-zinc-500">Price</span>
      <span className="text-slate-900 font-extrabold text-2xl lg:text-4xl joyride-step-2">
        $20.00
      </span>
    </div>
  );
}

function SupplyIndicator() {
  return (
    <>
      <span className="font-extrabold text-xl text-slate-900 mt-8">
        Basic Sword
      </span>

      <div className={'flex space-x-5 items-center -ml-3 mt-3'}>
        <div
          className={
            'flex space-x-2 items-center rounded-full p-2 lg:p-3 px-3 bg-white'
          }
        >
          <span className={'text-xs lg:text-base'}>🔥</span>
          <span
            className={'text-[11px] lg:text-sm font-semibold text-slate-900'}
          >
            Damage:{' '}
          </span>
          <span className={'text-[11px] lg:text-sm font-bold text-emerald-600'}>
            1x
          </span>
        </div>
        <div
          className={
            'flex space-x-2 items-center rounded-full p-2 lg:p-3 px-3 bg-white'
          }
        >
          <span className={'text-xs lg:text-base'}>🧱</span>
          <span
            className={'text-[11px] lg:text-sm font-semibold text-slate-900'}
          >
            Weight:
          </span>
          <span className={'text-[11px] lg:text-sm font-bold text-emerald-600'}>
            2x
          </span>
        </div>
      </div>
    </>
  );
}
