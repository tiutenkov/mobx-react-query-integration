import { createContext, useContext } from 'react';

import { CelebsStore } from '@store/CelebsStore.ts';

type Nullable<T> = T | null;

interface IStoreContext {
  celebsStore: CelebsStore;
}

export const StoreContext = createContext<Nullable<IStoreContext>>(null);

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore() must be used within a StoreProvider');
  }

  return store;
};
