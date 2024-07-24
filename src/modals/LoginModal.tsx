import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useLogin, usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { LoadingSpinner } from "../App.tsx";

export function LoginModal() {
  const { ready, authenticated } = usePrivy();

  return (
    <>
      <Dialog
        open={!ready || !authenticated}
        onClose={() => {}}
        transition
        className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0 z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 backdrop-blur-xl transition-all duration-300 delay-100 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm h-96 space-y-4 bg-white/70 backdrop-blur-2xl rounded-2xl ring-1 ring-black/5 p-12"
          >
            <LoginForm />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function LoginForm() {
  const { createWallet } = useSolanaWallets();

  const { login } = useLogin({
    onComplete: (user, isNewUser) => {
      if (user && isNewUser) {
        createWallet().catch();
      }
    },
  });

  const { ready } = usePrivy();

  if (!ready)
    return (
      <div
        className={"flex h-full flex-col items-center justify-center flex-1"}
      >
        <LoadingSpinner className={"!text-slate-900/20 !fill-slate-900"} />
        <span className={"text-slate-900 font-medium mt-5 text-sm"}>
          Signing you in...
        </span>
      </div>
    );

  return (
    <div className={"flex flex-1"}>
      <div
        className={
          "flex flex-col m-auto mt-0 lg:mt-10 rounded-t-3xl items-center justify-center w-full shadow-2xl lg:shadow-none lg:max-w-[300px] p-6 md:rounded-lg"
        }
      >
        <div
          className={
            "rounded-2xl h-11 w-11 bg-teal-500/20 ring-[0.5px] ring-black/5 flex items-center justify-center mb-3"
          }
        >
          <img
            className={"w-7 h-7 object-contain"}
            src={"https://i.redd.it/m72vtq2jtoq51.png"}
            alt={"sword"}
          />
        </div>
        <h3 className={"font-semibold text-base text-slate-900"}>
          Sign in to Battle Brawlers
        </h3>
        <div className={"my-8 w-full h-[0.5px] bg-black/5"} />
        <button
          className={
            "joyride-step-3 outline-none bg-slate-900 rounded-full h-14 w-full flex items-center justify-center hover:bg-slate-800 transition cursor-pointer"
          }
          onClick={login}
        >
          <span className={"text-sm font-semibold text-white"}>
            Login to Purchase
          </span>
        </button>
      </div>
    </div>
  );
}
