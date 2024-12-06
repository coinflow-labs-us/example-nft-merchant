import { useLogin, usePrivy } from "@privy-io/react-auth";
import { LoadingSpinner } from "../App.tsx";

export function LoginModal() {
  return (
    <div className={" w-screen h-full flex items-center justify-center"}>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const { ready } = usePrivy();
  const { login } = useLogin();

  if (!ready)
    return (
      <div
        className={
          "flex h-full flex-col items-center w-full justify-center flex-1 mx-auto"
        }
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
          "flex flex-col m-auto mt-0 lg:mt-10 rounded-t-3xl items-center justify-center w-full p-6"
        }
      >
        <div
          className={
            "rounded-2xl h-11 w-11 bg-teal-500/20 ring-[0.5px] ring-black/5 flex items-center justify-center mb-3"
          }
        >
          <img
            className={"w-7 h-7 object-contain"}
            src={"https://img.freepik.com/free-vector/cartoon-style-blue-shield_78370-1110.jpg"}
            alt={"shield"}
          />
        </div>
        <h3 className={"font-semibold text-base text-slate-900"}>
          Sign in to Battle Brawlers
        </h3>
        <div className={"my-8 w-full h-[0.5px] bg-black/5"} />
        <button
          className={
            "joyride-step-3 outline-none bg-slate-900 text-sm font-semibold text-white rounded-full h-14 w-full flex items-center justify-center hover:bg-slate-800 transition"
          }
          onClick={login}
        >
          Login to Purchase
        </button>
      </div>
    </div>
  );
}
