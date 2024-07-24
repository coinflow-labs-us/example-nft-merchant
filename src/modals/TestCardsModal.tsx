import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import mcLogo from "../assets/cards/mastercard.png";
import visaLogo from "../assets/cards/visa.png";
import dcLogo from "../assets/cards/discover.png";
import amexLogo from "../assets/cards/amex.png";

export function TestCardsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-xl backdrop-filter" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto backdrop-blur-xl flex flex-col items-start backdrop-filter w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-slate-900 font-semibold"
                  >
                    Test credit cards
                  </Dialog.Title>
                  <div className="mt-1">
                    <p className="text-sm text-slate-600">
                      Any future expiration date and CVV number will work for
                      testing
                    </p>
                  </div>
                  <div className="mt-2 mb-6 w-full">
                    <TestCardPanel close={() => setIsOpen(false)} />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-slate-900 font-semibold"
                  >
                    Simulate <span className={"text-red-600"}>failure</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-600 text-center">
                      Use '99999' as your zip code on checkout
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end w-full">
                    <button
                      type="button"
                      className="transition rounded-2xl border border-transparent bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-blue-500 focus:outline-none"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function TestCardPanel({ close }: { close: () => void }) {
  const testCards = [
    {
      number: "4111111111111111",
      display: "4111 1111 1111 1111",
      img: visaLogo,
    },
    {
      number: "5431111111111111",
      display: "5431 1111 1111 1111",
      img: mcLogo,
    },
    {
      number: "378282246310005",
      display: "3782 822463 10005",
      img: amexLogo,
    },
    {
      number: "6011111111111117",
      display: "6011 1111 1111 1117",
      img: dcLogo,
    },
  ];

  return (
    <div className={"flex-col"}>
      {testCards.map((card) => (
        <TestCardItem close={close} {...card} key={card.number} />
      ))}
    </div>
  );
}

function TestCardItem({
  number,
  display,
  img,
  close,
}: {
  number: string;
  display: string;
  img: string;
  close: () => void;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(number);
        setTimeout(() => {
          setCopied(false);
          close();
        }, 500);
      }}
      className={
        "flex flex-row items-center space-x-3 group cursor-pointer h-12 w-full"
      }
    >
      <img src={img} alt={"card"} className={"w-5 object-contain"} />
      <span
        className={
          "text-slate-600 font-semibold text-sm group-hover:text-slate-900 transition flex-1"
        }
      >
        {copied ? "Copied!" : display}
      </span>
      <i
        className={
          "bx bx-copy-alt text-sm text-slate-500 group-hover:text-slate-900 transition"
        }
      />
    </div>
  );
}
