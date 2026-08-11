import { type PropsWithChildren, useEffect } from 'react';

import {
  ISSUE_REFERENCE_DATA_API_TOKEN,
  type IIssueReferenceDataApi,
  useIssueReferenceDataStore,
} from '@/entities/issue';

import { useAuthStore } from '@/features/auth';
import { useService } from '@/shared/lib/di';

export const IssueReferenceDataProvider = ({
  children,
}: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.status);

  const issueReferenceDataApi =
    useService<IIssueReferenceDataApi>(
      ISSUE_REFERENCE_DATA_API_TOKEN,
    );

  const ensureLoaded =
    useIssueReferenceDataStore(
      (state) => state.ensureLoaded,
    );

  useEffect(() => {
    if (authStatus === 'authenticated') {
      void ensureLoaded(issueReferenceDataApi);
    }
  }, [
    authStatus,
    ensureLoaded,
    issueReferenceDataApi,
  ]);

  return children;
};