import {
  IssuesStoreProvider,
} from '../model/context/IssuesStoreProvider';

import {
  IssuesList,
} from './IssuesList';

import {
  IssuesListToolbar,
} from './IssuesListToolbar';

export const IssuesListWidget =
  () => {
    return (
      <IssuesStoreProvider>
        <div>
          <IssuesListToolbar />

          <IssuesList />
        </div>
      </IssuesStoreProvider>
    );
  };
