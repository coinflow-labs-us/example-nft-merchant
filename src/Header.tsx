import { ReactNode, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useShop } from "./context/ShopCoinflowContext.tsx";
import { focusedNft } from "./App.tsx";
import { TestCardsModal } from "./modals/TestCardsModal.tsx";

export function Header() {
  const { user, logout } = usePrivy();
  const { buyCredits, setBuyCredits } = useShop();

  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [testCardsOpen, setTestCardsOpen] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setShowHeader(true);
    } else if (scrollTop <= 50) {
      setShowHeader(false);
    }
  }

  return (
    <div
      className={
        "flex-col flex space-y-2 border-b border-black/10 sticky bg-white/60 backdrop-blur-2xl z-40 top-0 right-0 left-0 items-center px-8"
      }
    >
      <div
        className={`py-2 flex w-full items-center space-x-3 mx-auto z-50 max-w-3xl`}
      >
        <img
          src={
            "https://img.freepik.com/free-vector/cartoon-style-blue-shield_78370-1110.jpg"
          }
          alt={"Shield"}
          className={"w-4 object-contain"}
        />
        <span
          className={"hidden lg:flex font-extrabold text-slate-900 text-sm"}
        >
          Battle Brawlers
        </span>
        <div className={"flex-1"} />

        <div className={"joyride-step-5"}>
          <OutlineButton onClick={() => setTestCardsOpen(true)}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Test Cards
            </span>
          </OutlineButton>
        </div>
        <div className={"joyride-step-4 whitespace-nowrap"}>
          <OutlineButton onClick={() => setBuyCredits(!buyCredits)}>
            {buyCredits ? "Buy NFT" : "Buy Credits"}
          </OutlineButton>
        </div>
        {user && <OutlineButton onClick={logout}>Logout</OutlineButton>}
      </div>

      <div
        className={`${
          showHeader ? "opacity-100" : "opacity-0  -translate-y-10"
        } fixed top-24 bg-slate-100/90 shadow-xl transition-all duration-500 fade-in backdrop-blur-2xl flex items-center space-x-2 p-2 z-40 rounded-full`}
      >
        <img
          src={focusedNft.image}
          alt={"nft"}
          className={"w-7 h-7 rounded-full"}
        />
        <span className={"text-sm font-bold text-slate-900"}>$20.00</span>
      </div>
      <TestCardsModal isOpen={testCardsOpen} setIsOpen={setTestCardsOpen} />
    </div>
  );
}

function OutlineButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer font-normal text-xs flex items-center text-slate-700 hover:text-slate-900 transition py-3"
      }
    >
      {children}
    </div>
  );
}
