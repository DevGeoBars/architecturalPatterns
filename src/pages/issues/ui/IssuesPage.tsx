import type { IIssueApi } from '@/entities/issue';
import {
  IssuesList,
  IssuesListStoreProvider,
} from '@/features/view-issues-list';

export interface IIssuesPageProps {
  issueApi: IIssueApi;
}

export const IssuesPage = ({
  issueApi,
}: IIssuesPageProps) => {
  return (
    <IssuesListStoreProvider issueApi={issueApi}>
      <IssuesList />
    </IssuesListStoreProvider>
  );
};
