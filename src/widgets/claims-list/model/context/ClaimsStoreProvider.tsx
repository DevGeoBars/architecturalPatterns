import {
  type PropsWithChildren,
  useState,
} from 'react';

import {
  CLAIM_API_TOKEN,
  createClaimsStore,
  type IClaimApi,
} from '@/entities/claim';

import {
  useService,
} from '@/shared/lib/di';

import {
  ClaimsStoreContext,
} from './ClaimsStoreContext';

export const ClaimsStoreProvider = ({
  children,
}: PropsWithChildren) => {
  const claimApi =
    useService<IClaimApi>(
      CLAIM_API_TOKEN,
    );

  const [store] = useState(() =>
    createClaimsStore(
      claimApi,
    ),
  );

  return (
    <ClaimsStoreContext.Provider
      value={store}
    >
      {children}
    </ClaimsStoreContext.Provider>
  );
};
