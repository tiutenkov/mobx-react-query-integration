import { PropsWithChildren, useRef } from 'react';

import { CelebsStore } from '@store/CelebsStore.ts';

import { StoreContext } from './StoreContext';

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const value = useRef({
    celebsStore: new CelebsStore(),
  });

  return <StoreContext.Provider value={value.current}>{children}</StoreContext.Provider>;
};
