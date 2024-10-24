import { useCallback, useEffect, useState } from "react";
import { CoinflowPurchase } from "@coinflowlabs/react";
import { coinflowEnv, useShop } from "./context/ShopCoinflowContext";
import { NftSuccessModal } from "./modals/NftSuccessModal";
import { CreditsSuccessModal } from "./modals/CreditsSuccessModal";
import { useWallet } from "./wallet/Wallet.tsx";
import { LoadingSpinner } from "./App.tsx";
import { VersionedTransaction } from "@solana/web3.js";

export function CoinflowForm() {
  const { wallet, connection } = useWallet();

  const { buyCredits } = useShop();

  const [creditSuccessOpen, setCreditSuccessOpen] = useState<boolean>(false);
  const [nftSuccessOpen, setNftSuccessOpen] = useState<boolean>(false);

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
        <CoinflowPurchaseWrapper
          onSuccess={() => {
            setTimeout(() => {
              setCreditSuccessOpen(true);
            }, 1200);
          }}
        />
        <CreditsSuccessModal
          isOpen={creditSuccessOpen}
          setIsOpen={setCreditSuccessOpen}
        />
      </div>
    );
  }

  return (
    <div className={"w-full flex-1 "}>
      <CoinflowPurchaseWrapper
        onSuccess={() => setNftSuccessOpen(true)}
        transaction={transaction}
        amount={amount}
      />
      <NftSuccessModal isOpen={nftSuccessOpen} setIsOpen={setNftSuccessOpen} />
    </div>
  );
}

function CoinflowPurchaseWrapper({
  onSuccess,
  transaction,
  amount,
}: {
  onSuccess: () => void;
  transaction?: VersionedTransaction;
  amount?: number;
}) {
  const { wallet, connection } = useWallet();

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

  return (
    <div className={"h-full flex-1 w-full relative pb-20"}>
      <div
        className={"absolute w-full min-h-96 flex items-center justify-center"}
      >
        <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"} />
      </div>
      <div
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        className={
          "flex-col h-full flex mx-auto relative overflow-hidden rounded-none md:rounded-xl md:border border-black/5"
        }
      >
        <CoinflowPurchase
          handleHeightChange={handleHeightChange}
          wallet={wallet}
          merchantId={"nft-example"}
          env={coinflowEnv}
          connection={connection}
          onSuccess={onSuccess}
          transaction={transaction}
          amount={amount}
          blockchain={"solana"}
          rent={{ lamports: 22799440 }}
        />
      </div>
    </div>
  );
}
