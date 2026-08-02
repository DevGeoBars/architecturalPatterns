import type {
  CreateIssueData,
  Issue,
} from '@/entities/issue';

import type {
  TCreateIssueRequestStatus,
} from './createIssueRequestStatus';

export interface ICreateIssueState {
  requestStatus: TCreateIssueRequestStatus;
  error: string | null;

  createIssue: (
    data: CreateIssueData,
  ) => Promise<Issue | null>;
}
