// features/view-issues-list/model/IssuesListStoreProvider.tsx

import {
  type PropsWithChildren,
  useRef,
} from 'react';

import type {
  IIssueApi,
} from '@/entities/issue';

import {
  createIssuesListStore,
  type TIssuesListStore,
} from './createIssuesListStore';
import {
  IssuesListStoreContext,
} from './issuesListStoreContext';

interface IIssuesListStoreProviderProps
  extends PropsWithChildren {
  issueApi: IIssueApi;
}

export const IssuesListStoreProvider = ({
  issueApi,
  children,
}: IIssuesListStoreProviderProps) => {
  const storeRef = useRef<TIssuesListStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current =
      createIssuesListStore(issueApi);
  }

  return (
    <IssuesListStoreContext.Provider value={storeRef.current}>
      {children}
    </IssuesListStoreContext.Provider>
  );
};
