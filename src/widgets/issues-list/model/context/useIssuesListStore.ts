import { useContext } from 'react';
import { useStore } from 'zustand';

import type {
  IIssuesListState,
} from '@/entities/issue';

import {
  IssuesListStoreContext,
} from './issuesListStoreContext';

export const useIssuesListStore = <T,>(
  selector: (
    state: IIssuesListState,
  ) => T,
): T => {
  const store = useContext(
    IssuesListStoreContext,
  );

  if (store === null) {
    throw new Error(
      'useIssuesListStore должен использоваться внутри IssuesListStoreProvider',
    );
  }

  return useStore(store, selector);
};
