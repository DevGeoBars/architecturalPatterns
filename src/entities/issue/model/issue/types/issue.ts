import type { AttachedFile } from './attachedFile';
import type { Comment } from './comment';
import type { Direction } from './direction';
import type { IssueLabel } from './issueLabel';
import {
  ISSUE_STATUSES,
  type TIssueStatus,
} from './issueStatus';
import type {
  TIssueUserStatus,
} from './issueUserStatus';
import type { Responsible } from './responsible';
import type { Suggestion } from './suggestion';

export interface Issue {
  id: number;
  number: number;

  statusCode: number;
  status: TIssueStatus;

  userStatusCode: number;
  userStatus: TIssueUserStatus;

  isClosedByUser: boolean;

  author?: string;
  authorEmail?: string;
  category: string;
  owner?: string;

  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;

  severity?: string;
  subject?: string;
  product?: string;
  version?: string;
  os?: string;
  type?: string;
  content?: string;

  files: AttachedFile[];

  client?: string;
  organization?: string;
  organizationId?: number;

  responsible?: Responsible;

  comments: Comment[];
  relatedIssues: Issue[];
  relatedSuggestions: Suggestion[];
  labels: IssueLabel[];

  direction?: Direction;
  directionName?: string;

  customerTaxId?: string;
  customerOrganizationName?: string;

  isDemonstrated: boolean;
}

export const isIssueClosed = (
  issue: Issue,
): boolean => {
  return issue.status === 'Закрыто';
};

export const isIssueEditable = (
  issue: Issue,
): boolean => {
  return issue.status !== ISSUE_STATUSES[3]
    && issue.status !== ISSUE_STATUSES[4]
    && issue.status !== ISSUE_STATUSES[9];
};
