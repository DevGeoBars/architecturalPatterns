import type { Issue } from '../types/issue';
import { ISSUE_STATUSES } from '../types/issueStatus';

export const isIssueClosed = (
  issue: Issue,
): boolean => {
  return issue.status === ISSUE_STATUSES[4];
};

export const isIssueEditable = (
  issue: Issue,
): boolean => {
  return issue.status !== ISSUE_STATUSES[3]
    && issue.status !== ISSUE_STATUSES[4]
    && issue.status !== ISSUE_STATUSES[9];
};
