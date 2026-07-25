import { createContext } from 'react';

import type {
  TIssuesListStore,
} from '@/entities/issue';

export const IssuesListStoreContext =
  createContext<TIssuesListStore | null>(
    null,
  );

//todo остановились тут
