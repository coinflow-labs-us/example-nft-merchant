import { useWallet } from "../wallet/Wallet";
import { useMemo } from "react";

export function useTour() {
  const { wallet } = useWallet();

  const skipTour = useMemo(() => {
    return !!wallet.publicKey;
  }, [wallet.publicKey]);

  const steps = useMemo(() => {
    return [
      {
        target: ".joyride-step-1",
        title: "Hello 👋",
        content:
          "Welcome to the Coinflow demo app! Let's buy this awesome digital collectible using Coinflow Checkout.",
        disableBeacon: true,
      },
      {
        target: ".joyride-step-2",
        title: "Let's buy 💸",
        content:
          "The price is $20. With Coinflow, let's purchase this using a credit card, ACH transfer, or crypto. (You won't be charged, since this is a test environment.)",
        disableBeacon: true,
      },
      {
        target: ".joyride-step-4",
        title: "Coinflow credits 🪙",
        content:
          'Coinflow allows end-users to optionally purchase credits to "top up" their account balance for future purchases. Think of this like a closed-loop gift card or in-app balance.',
        disableBeacon: true,
      },
      {
        target: ".joyride-step-5",
        title: "Test cards 💳",
        content:
          "Find test cards here to quickly make purchases with different cards. ",
        disableBeacon: true,
      },
      {
        target: ".joyride-step-3",
        title: "You're ready 👍",
        content: "Sign in to get started",
        disableBeacon: true,
        hideFooter: true,
      },
    ];
  }, []);

  return { steps, skipTour };
}
