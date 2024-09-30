import { useState } from "react";
import { focusedNft } from "./App";
import { useWallet } from "./wallet/Wallet";

export function DirectPurchaseForm() {
  const { wallet } = useWallet();
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={
        "flex flex-col h-auto max-w-full w-full bg-base-1 overflow-hidden relative border-b border-black/10"
      }
    >
      {wallet && wallet.publicKey ? (
        <div className="flex space-x-2 items-center pt-4 pl-9">
          <span className="text-xs text-slate-900 ">
            Welcome back, user {wallet.publicKey.toString()}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(wallet.publicKey.toString());
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
            className={`outline-none focus:outline-none border-none transition text-[11px] ${
              copied
                ? "bg-green-50 text-green-900"
                : "text-slate-600 hover:bg-slate-100 bg-slate-50"
            } px-1.5 py-0.5 rounded-xl flex items-center justify-center`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : null}
      <div
        className={
          "bg-transparent flex flex-col items-center z-30 p-2 pb-10 lg:p-10 flex-1 h-full pt-28 lg:pt-12"
        }
      >
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8"}>
          <div
            className={
              "flex-col space-y-5 justify-center ring-1 ring-black/5 rounded-2xl align-center max-w-[350px]"
            }
          >
            <div
              className={
                "p-2 rounded-2xl bg-slate-50 backdrop-blur-2xl joyride-step-1"
              }
            >
              <img
                src={focusedNft.image}
                alt={"nft"}
                className={"w-full rounded-lg ring-1 ring-black/5"}
              />
            </div>
          </div>
          <div className={"flex flex-col"}>
            <SupplyIndicator />
            <Total />
          </div>
        </div>
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="flex flex-col mt-6 items-end flex-1 justify-end ">
      <span className="text-xs text-slate-500">Price</span>
      <span className="text-slate-900 font-extrabold text-xl lg:text-3xl joyride-step-2">
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

      <div className={"flex space-x-4 items-center mt-3"}>
        <div
          className={
            "flex space-x-1 items-center rounded-xl p-2 bg-orange-50 ring-1 ring-orange-100"
          }
        >
          <span className={"text-xs text-white"}>🔥.</span>
          <span className={"text-xs font-semibold text-slate-900"}>
            Damage:{" "}
          </span>
          <span className={"text-xs font-bold text-orange-600"}>3x </span>
        </div>
        <div
          className={
            "flex space-x-1 items-center rounded-xl p-2 bg-indigo-50 ring-1 ring-indigo-100"
          }
        >
          <span className={"text-xs text-white"}>🧱</span>
          <span className={"text-xs font-semibold text-slate-900"}>
            Weight:{" "}
          </span>
          <span className={"text-xs font-bold text-indigo-600"}>2x </span>
        </div>
      </div>
    </>
  );
}
