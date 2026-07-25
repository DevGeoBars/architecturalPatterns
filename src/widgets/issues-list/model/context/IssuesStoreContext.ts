import {
  createContext,
} from 'react';

import type {
  TIssuesStore,
} from '@/entities/issue';

export const IssuesStoreContext =
  createContext<TIssuesStore | null>(
    null,
  );
