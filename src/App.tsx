import React, {ReactNode, useState} from 'react';
import './App.css';
import {useWallet, WalletContextProvider} from './wallet/Wallet';
import {BrowserRouter} from 'react-router-dom';
import ShopCoinflowContextProvider from './context/ShopCoinflowContext';
import {CoinflowForm} from './CoinflowForm';
import {DirectPurchaseForm} from './DirectPurchaseForm';
import {Header} from './Header';
import Joyride from 'react-joyride';
import {TourTooltip} from './TourTooltip';
import {useTour} from './context/useTour';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from '@headlessui/react';
import {useMetakeepStore} from './context/useMetakeepStore';

export const focusedNft = {
  image:
    'https://opengameart.org/sites/default/files/short_sword_game_item.jpg',
  name: 'Test NFT',
};

function App() {
  return (
    <ContextWrapper>
      <TourComponent />
      <ShopCoinflowContextProvider>
        <div className={'w-full flex flex-col h-screen relative bg-white'}>
          <div
            className={
              'flex flex-col lg:flex-row max-h-none h-auto lg:max-h-screen lg:h-screen w-full flex-1'
            }
          >
            <DirectPurchaseForm />
            <div
              className={
                'flex flex-col flex-1 bg-white overflow-auto h-screen static lg:relative'
              }
            >
              <Header />
              <Content />
            </div>
          </div>
        </div>
      </ShopCoinflowContextProvider>
    </ContextWrapper>
  );
}

function TourComponent() {
  const {skipTour, steps} = useTour();

  return (
    <Joyride
      run={!skipTour}
      tooltipComponent={TourTooltip}
      steps={steps}
      showSkipButton
      showProgress
      scrollToFirstStep
      continuous
    />
  );
}

function Content() {
  const {publicKey} = useWallet();

  if (!publicKey) return <LoginForm />;

  return <CoinflowForm />;
}

function LoginForm() {
  const {connect, initialized} = useWallet();
  const {email, setEmail} = useMetakeepStore();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    const metakeep = await connect(email);
    if (!metakeep) return;
    await metakeep.signMessage(
      Buffer.from("Let's Battle").toString('utf8'),
      'Sign in'
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  if (!initialized)
    return (
      <div className={'flex flex-col items-center justify-center flex-1'}>
        <LoadingSpinner className={'text-gray-900/20 fill-gray-900'} />
        <span className={'text-gray-900 font-medium mt-5 text-xs'}>
          Signing you in...
        </span>
      </div>
    );

  return (
    <div className={'bg-zinc-200 lg:bg-white flex flex-1'}>
      <div
        className={
          'flex flex-col m-auto ring-0 lg:ring-1 ring-black/5 mt-0 lg:mt-10 rounded-t-3xl bg-white items-center justify-center w-full shadow-2xl lg:shadow-none lg:max-w-[300px] p-6 md:rounded-lg'
        }
      >
        <div
          className={
            'rounded-2xl h-11 w-11 bg-teal-500/20 ring-[0.5px] ring-black/5 flex items-center justify-center mb-3'
          }
        >
          <img
            className={'w-7 h-7 object-contain'}
            src={'https://i.redd.it/m72vtq2jtoq51.png'}
            alt={'sword'}
          />
        </div>
        <h3 className={'font-semibold text-base text-gray-900'}>
          Sign in to Battle Brawlers
        </h3>
        <div className={'my-8 w-full h-[0.5px] bg-black/5'} />

        <Field className={'w-full'}>
          <Input
            placeholder={'Email address'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={
              'mb-6 flex w-full rounded-lg border-none bg-gray-100 ring-1 ring-black/5 h-12 px-4 text-sm/6 text-gray-950 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            }
          />
        </Field>
        <button
          className={
            'joyride-step-3 bg-gray-900 rounded-xl h-12 w-full flex items-center justify-center hover:bg-gray-800 transition cursor-pointer'
          }
          onClick={login}
        >
          <span className={'text-xs font-semibold text-white'}>
            {loading ? <LoadingSpinner /> : 'Login to Purchase'}
          </span>
        </button>
      </div>
    </div>
  );
}

export function LoadingSpinner({className}: {className?: string}) {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className={`h-4 w-4 animate-spin fill-white text-white/20 ${className}`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function ContextWrapper({children}: {children: ReactNode}) {
  return (
    <div
      className={'flex flex-col items-center justify-center h-screen w-screen'}
    >
      <WalletContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </WalletContextProvider>
    </div>
  );
}

export default App;
