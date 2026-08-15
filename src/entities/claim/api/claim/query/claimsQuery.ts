import { queryOptions } from '@tanstack/react-query';

import type { IClaimApi } from '../claimApi';

export const getClaimsQueryKey = () => ['claims', 'list'];

export const getClaimsQueryOptions = (claimApi: IClaimApi) => queryOptions({
  queryKey: getClaimsQueryKey(),
  queryFn: () => claimApi.getClaims(),
  staleTime: Infinity,
  gcTime: Infinity,
});
