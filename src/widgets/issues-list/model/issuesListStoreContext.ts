import { createContext } from 'react';

import type {
  TIssuesListStore,
} from './createIssuesListStore';

export const IssuesListStoreContext =
  createContext<TIssuesListStore | null>(
    null,
  );
