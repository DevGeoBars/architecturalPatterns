import {
  type PropsWithChildren, useState,
} from 'react';

import {
  createIssuesStore,
  ISSUE_API_TOKEN,
  type IIssueApi,
} from '@/entities/issue';

import {
  useService,
} from '@/shared/lib/di';

import {
  IssuesStoreContext,
} from './IssuesStoreContext';

export const IssuesStoreProvider = ({
  children,
}: PropsWithChildren) => {
  const issueApi =
    useService<IIssueApi>(
      ISSUE_API_TOKEN,
    );

  const [store] = useState(() =>
    createIssuesStore(issueApi),
  );

  return (
    <IssuesStoreContext.Provider
      value={store}
    >
      {children}
    </IssuesStoreContext.Provider>
  );
};
