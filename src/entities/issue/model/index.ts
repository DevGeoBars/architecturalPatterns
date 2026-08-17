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

export type {
  IssueStaticDictionaries,
  IssueStaticDictionaryItem,
} from './issue-static-dictionaries';

export {
  ISSUE_STATUSES,
  ISSUE_USER_STATUSES,
  getResponsibleFullName,
  isIssueClosed,
  isIssueEditable,
  isIssueStatusCode,
  isIssueUserStatusCode,
} from './issue';

