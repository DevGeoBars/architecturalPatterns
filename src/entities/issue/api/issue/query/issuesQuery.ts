import { queryOptions } from '@tanstack/react-query';

import type { IIssueApi } from '../issueApi';

export const getIssuesQueryKey = () => ['issues', 'list'];

export const getIssuesQueryOptions = (issueApi: IIssueApi) => {
  return queryOptions({
    queryKey: getIssuesQueryKey(),
    queryFn: () => issueApi.getIssues(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
