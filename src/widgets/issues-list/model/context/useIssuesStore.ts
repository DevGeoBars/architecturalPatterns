import {
  useContext,
} from 'react';

import {
  useStore,
} from 'zustand';

import type {
  IIssuesState,
} from '@/entities/issue';

import {
  IssuesStoreContext,
} from './IssuesStoreContext';

export const useIssuesStore = <T>(
  selector: (
    state: IIssuesState,
  ) => T,
): T => {
  const store =
    useContext(IssuesStoreContext);

  if (store === null) {
    throw new Error(
      'useIssuesStore должен использоваться внутри IssuesStoreProvider',
    );
  }

  return useStore(
    store,
    selector,
  );
};
