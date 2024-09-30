import { useCallback, useEffect, useState } from "react";
import { CoinflowPurchase } from "@coinflowlabs/react";
import { coinflowEnv, useShop } from "./context/ShopCoinflowContext";
import { NftSuccessModal } from "./modals/NftSuccessModal";
import { CreditsSuccessModal } from "./modals/CreditsSuccessModal";
import { useWallet } from "./wallet/Wallet.tsx";
import { LoadingSpinner } from "./App.tsx";

export function CoinflowForm() {
  const { wallet, connection } = useWallet();

  console.log({ wallet });
  const { buyCredits } = useShop();

  const [creditSuccessOpen, setCreditSuccessOpen] = useState<boolean>(false);
  const [nftSuccessOpen, setNftSuccessOpen] = useState<boolean>(false);

  const [height, setHeight] = useState<number>(0);
  const [handleHeightChange, setHandleHeightChange] = useState<
    ((newHeight: string) => void) | undefined
  >(undefined);

  const handleHeight = useCallback((newHeight: string) => {
    setHeight(Number(newHeight));
  }, []);

  useEffect(() => {
    if (wallet.publicKey) {
      setHandleHeightChange(() => handleHeight);
    }
  }, [handleHeight, wallet]);

  const { transaction, amount } = useShop();

  if (!transaction || !wallet || !wallet.publicKey || !connection)
    return (
      <div className={"w-full min-h-96 flex items-center justify-center"}>
        <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"} />
      </div>
    );

  if (buyCredits) {
    return (
      <div className={"w-full flex-1"}>
        <div
          className={
            "overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full bg-white relative"
          }
        >
          <div
            className={
              "absolute w-full min-h-96 flex items-center justify-center"
            }
          >
            <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"} />
          </div>
          <div
            style={{ height: `${height}px` }}
            className={"flex-col h-full flex -mt-14 mx-auto relative"}
          >
            <CoinflowPurchase
              wallet={wallet}
              merchantId={"nft-example"}
              env={coinflowEnv}
              connection={connection}
              onSuccess={() => {
                setTimeout(() => {
                  setCreditSuccessOpen(true);
                }, 1200);
              }}
              blockchain={"solana"}
              handleHeightChange={handleHeightChange}
            />
          </div>
        </div>
        <CreditsSuccessModal
          isOpen={creditSuccessOpen}
          setIsOpen={setCreditSuccessOpen}
        />
      </div>
    );
  }

  return (
    <div className={" w-full flex-1"}>
      <div
        className={
          "overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full bg-white relative"
        }
      >
        <div
          className={
            "absolute w-full min-h-96 flex items-center justify-center"
          }
        >
          <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"} />
        </div>
        <div
          style={{ height: `${height}px` }}
          className={"flex-col h-full flex -mt-12 mx-auto relative"}
        >
          <CoinflowPurchase
            handleHeightChange={handleHeightChange}
            wallet={wallet}
            merchantId={"nft-example"}
            env={coinflowEnv}
            connection={connection}
            onSuccess={() => setNftSuccessOpen(true)}
            transaction={transaction}
            amount={amount}
            blockchain={"solana"}
            rent={{ lamports: 22799440 }}
          />
        </div>
      </div>
      <NftSuccessModal isOpen={nftSuccessOpen} setIsOpen={setNftSuccessOpen} />
    </div>
  );
}
