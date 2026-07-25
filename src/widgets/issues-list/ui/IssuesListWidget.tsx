import {
  IssuesStoreProvider,
} from '../model/context/IssuesStoreProvider';

import {
  IssuesList,
} from './IssuesList';

export const IssuesListWidget = () => {
  return (
    <IssuesStoreProvider>
      <IssuesList />
    </IssuesStoreProvider>
  );
};
