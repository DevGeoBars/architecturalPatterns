export type {
  AttachedFile,
  Comment,
  CreateCommentData,
  CreateIssueData,
  Direction,
  Issue,
  IssueLabel,
  Responsible,
  Suggestion,
  TCommentTheme,
  TIssueStatus,
  TIssueStatusCode,
  TIssueUserStatus,
  TIssueUserStatusCode,
  UpdateIssueData,
} from './issue';

export {
  ISSUE_STATUSES,
  ISSUE_USER_STATUSES,
  getResponsibleFullName,
  isIssueClosed,
  isIssueStatusCode,
  isIssueUserStatusCode,
} from './issue';

export type {
  IssueReferenceData,
  IssueReferenceDataItem,
} from './static-dictionaries-data';

