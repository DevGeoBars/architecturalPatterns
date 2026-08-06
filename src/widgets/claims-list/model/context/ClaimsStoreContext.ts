import {
  createContext,
} from 'react';

import type {
  TClaimsStore,
} from '@/entities/claim';

export const ClaimsStoreContext =
  createContext<TClaimsStore | null>(
    null,
  );
