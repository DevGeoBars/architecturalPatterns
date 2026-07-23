import type { IIssueApi } from '@/entities/issue';
import {
  IssuesListWidget,
} from '@/widgets/issues-list';

export interface IIssuesPageProps {
  issueApi: IIssueApi;
}

export const IssuesPage = ({
  issueApi,
}: IIssuesPageProps) => {
  return (
    <IssuesListWidget issueApi={issueApi}/>
  );
};
