import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { focusedNft } from "../App";

export function NftSuccessModal({
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
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl backdrop-filter" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="backdrop-blur-xl items-center flex flex-col backdrop-filter w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    className={
                      "p-1 rounded-2xl shadow-2xl bg-slate-300 backdrop-blur-2xl w-32 mb-3"
                    }
                  >
                    <img
                      src={focusedNft.image}
                      alt={"nft"}
                      className={"w-full rounded-xl"}
                    />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-slate-900 font-semibold"
                  >
                    Purchase successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-600 text-center">
                      Your payment has been successfully submitted & you've
                      received your item!
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="transition rounded-2xl border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none"
                      onClick={() => {
                        closeModal();
                        window.location.reload();
                      }}
                    >
                      Try another purchase
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
