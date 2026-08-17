import { queryOptions } from '@tanstack/react-query';

import type { IIssueStaticDictionariesApi } from '../issueStaticDictionariesApi';

export const getIssueStaticDictionariesQueryOptions = (
  api: IIssueStaticDictionariesApi,
) => {
  return queryOptions({
    queryKey: ['issue-static-dictionaries'],
    queryFn: () => api.getDictionaries(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
