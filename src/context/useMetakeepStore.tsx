import {create} from 'zustand';

import {persist} from 'zustand/middleware';
import {MetaKeep} from 'metakeep';
import {PublicKey} from '@solana/web3.js';

type MetakeepStore = {
  metakeep: MetaKeep | null;
  setMetakeep: (m: MetaKeep | null) => void;
  publicKey: PublicKey | null;
  setPublicKey: (p: PublicKey | null) => void;
  email: string;
  setEmail: (email: string) => void;
};

export const useMetakeepStore = create<MetakeepStore>()(
  persist(
    set => ({
      metakeep: null,
      setMetakeep: (m: MetaKeep | null) =>
        set(() => ({
          metakeep: m,
        })),
      publicKey: null,
      setPublicKey: (m: PublicKey | null) =>
        set(() => ({
          publicKey: m,
        })),
      email: '',
      setEmail: (m: string) =>
        set(() => ({
          email: m,
        })),
    }),
    {
      name: 'metakeep-store',
      partialize: state => ({
        email: state.email,
      }),
    }
  )
);
