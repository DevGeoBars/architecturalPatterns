export const APP_ROUTES = {
    LOGIN: '/login',
    HOME: '/home',
    CLAIMS: '/claims',
    ISSUES: '/issues',
    ACTIONS: '/actions',
    ISSUE_NEW: '/issues/new',
    ISSUE_DETAIL: '/issues/:id',
    ISSUE_EDIT: '/issues/:id/edit',
} as const;

export const getIssueDetailRoute = (
  issueId: number,
): string => {
    return `/issues/${issueId}`;
};

export const getIssueEditRoute = (
  issueId: number,
): string => {
    return `/issues/${issueId}/edit`;
};