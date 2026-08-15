import { queryOptions } from '@tanstack/react-query';

import type { IIssueReferenceDataApi } from '../issueReferenceDataApi';

export const getIssueReferenceDataQueryOptions = (
  api: IIssueReferenceDataApi,
) => {
  return queryOptions({
    queryKey: ['issue', 'reference-data'],
    queryFn: () => api.getReferenceData(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
