import {
  ClaimsStoreProvider,
} from '../model/context/ClaimsStoreProvider';

import {
  ClaimsList,
} from './ClaimsList';

export const ClaimsListWidget = () => {
  return (
    <ClaimsStoreProvider>
      <ClaimsList />
    </ClaimsStoreProvider>
  );
};
