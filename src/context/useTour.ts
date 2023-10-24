import {useWallet} from '../wallet/Wallet';
import {useEffect, useMemo, useState} from 'react';

export function useTour() {
  const wallet = useWallet();

  const skipTour = useMemo(() => {
    return !!wallet.publicKey;
  }, [wallet.publicKey]);

  const steps = useMemo(() => {
    return [
      {
        target: '.joyride-step-1',
        title: 'Hello 👋',
        content:
          "Welcome to the Coinflow demo app! Let's buy this awesome digital collectible using Coinflow Checkout.",
        disableBeacon: true,
      },
      {
        target: '.joyride-step-2',
        title: "Let's buy 💸",
        content:
          'The price is 20 fake internet dollars. With Coinflow, lets purchase this using credit card, ACH transfers, or crypto.',
        disableBeacon: true,
      },
      {
        target: '.joyride-step-4',
        title: 'Coinflow credits 🪙',
        content:
          'Coinflow allows end-users to optionally purchase credits to "top up" their account balance for future purchases. Think of this like a gift card or in-app Venmo balance.',
        disableBeacon: true,
      },
      {
        target: '.joyride-step-5',
        title: 'Test cards 💳',
        content:
          'Find test cards here to quickly make purchases with different cards. ',
        disableBeacon: true,
      },
      {
        target: '.joyride-step-3',
        title: "You're ready 👍",
        content: 'Sign in to get started',
        disableBeacon: true,
        hideFooter: true,
      },
    ];
  }, []);

  return {steps, skipTour};
}
