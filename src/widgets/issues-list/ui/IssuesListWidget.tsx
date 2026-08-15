import { IssuesList } from './IssuesList';
import { IssuesListToolbar } from './IssuesListToolbar';

import './IssuesList.scss';

export const IssuesListWidget = () => {
  return (
    <div className="issues-list-widget">
      <IssuesListToolbar />
      <IssuesList />
    </div>
  );
};
