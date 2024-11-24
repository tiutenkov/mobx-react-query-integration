import { createContext, useContext } from 'react';

import { CelebDetailsStore } from '@store/CelebDetailsStore.ts';
import { CelebsStore } from '@store/CelebsStore.ts';

type Nullable<T> = T | null;

interface IStoreContext {
  celebsStore: CelebsStore;
  celebDetailsStore: CelebDetailsStore;
}

export const StoreContext = createContext<Nullable<IStoreContext>>(null);

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore() must be used within a StoreProvider');
  }

  return store;
};
