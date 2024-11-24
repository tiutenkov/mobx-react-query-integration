import { PropsWithChildren, useRef } from 'react';

import { CelebDetailsStore } from '@store/CelebDetailsStore.ts';
import { CelebsStore } from '@store/CelebsStore.ts';
import { useQueryClient } from '@tanstack/react-query';

import { StoreContext } from './StoreContext';

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const value = useRef({
    celebsStore: new CelebsStore(queryClient),
    celebDetailsStore: new CelebDetailsStore(queryClient),
  });

  return <StoreContext.Provider value={value.current}>{children}</StoreContext.Provider>;
};
