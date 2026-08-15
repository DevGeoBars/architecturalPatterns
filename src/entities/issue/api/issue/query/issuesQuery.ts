import { queryOptions } from '@tanstack/react-query';

import type { IIssueApi } from '../issueApi';

export const getIssuesQueryKey = () => ['issues', 'list'];

export const getIssueQueryKey = (issueId: number) => ['issues', 'detail', issueId];

export const getIssuesQueryOptions = (issueApi: IIssueApi) => {
  return queryOptions({
    queryKey: getIssuesQueryKey(),
    queryFn: () => issueApi.getIssues(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const getIssueQueryOptions = (issueApi: IIssueApi, issueId: number) => {
  return queryOptions({
    queryKey: getIssueQueryKey(issueId),
    queryFn: () => issueApi.getIssue(issueId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
