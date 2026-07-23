import {
  type PropsWithChildren,
  useState,
} from 'react';

import { type IIssueApi, createIssuesListStore } from '@/entities/issue';

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
  const [store] = useState(() =>
    createIssuesListStore(issueApi),
  );

  return (
    <IssuesListStoreContext.Provider value={store}>
      {children}
    </IssuesListStoreContext.Provider>
  );
};
