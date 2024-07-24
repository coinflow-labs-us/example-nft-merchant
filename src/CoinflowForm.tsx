import { useCallback, useEffect, useState } from "react";
import { CoinflowPurchase } from "@coinflowlabs/react";
import { coinflowEnv, useShop } from "./context/ShopCoinflowContext";
import { NftSuccessModal } from "./modals/NftSuccessModal";
import { CreditsSuccessModal } from "./modals/CreditsSuccessModal";
import { useWallet } from "./wallet/Wallet.tsx";
import { usePrivy } from "@privy-io/react-auth";

export function CoinflowForm() {
  const { wallet, connection } = useWallet();
  const { buyCredits } = useShop();
  const { user } = usePrivy();

  console.log({ user });

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

  console.log(wallet.publicKey?.toString());

  if (!transaction || !wallet || !wallet.publicKey || !connection) return null;

  if (buyCredits) {
    return (
      <div className={" w-full flex-1"}>
        <div
          className={
            "overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full bg-white"
          }
        >
          <div
            style={{ height: `${height}px` }}
            className={"flex-col h-full flex lg:-mt-12 -mt-12 mx-auto"}
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
          "overflow-auto h-auto px-0 lg:px-8 lg:pb-6 flex-1 w-full bg-white"
        }
      >
        <div
          style={{ height: `${height}px` }}
          className={"flex-col h-full flex lg:-mt-12 -mt-10 mx-auto"}
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
