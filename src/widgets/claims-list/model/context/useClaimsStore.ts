import {
  useContext,
} from 'react';

import {
  useStore,
} from 'zustand';

import type {
  IClaimsState,
} from '@/entities/claim';

import {
  ClaimsStoreContext,
} from './ClaimsStoreContext';

export const useClaimsStore = <T>(
  selector: (
    state: IClaimsState,
  ) => T,
): T => {
  const store =
    useContext(
      ClaimsStoreContext,
    );

  if (store === null) {
    throw new Error(
      'useClaimsStore должен использоваться внутри ClaimsStoreProvider',
    );
  }

  return useStore(
    store,
    selector,
  );
};
