import { IssuesStoreProvider } from '../model/context/IssuesStoreProvider';

import { IssuesList } from './IssuesList';
import { IssuesListToolbar } from './IssuesListToolbar';

import './IssuesList.scss';

export const IssuesListWidget = () => {
  return (
    <IssuesStoreProvider>
      <div className="issues-list-widget">
        <IssuesListToolbar />
        <IssuesList />
      </div>
    </IssuesStoreProvider>
  );
};
