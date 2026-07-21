export const ISSUE_USER_STATUSES = {
  0: 'Не рассмотрено',
  1: 'Реализовано неверно',
  2: 'Исправлено',
} as const;

export type TIssueUserStatusCode =
  keyof typeof ISSUE_USER_STATUSES;

export type TIssueUserStatus =
  (typeof ISSUE_USER_STATUSES)[TIssueUserStatusCode];

export const getIssueUserStatus = (
  statusCode: number,
): TIssueUserStatus => {
  const status =
    ISSUE_USER_STATUSES[
      statusCode as TIssueUserStatusCode
      ];

  if (!status) {
    throw new Error(
      `Неизвестный пользовательский статус: ${statusCode}`,
    );
  }

  return status;
};
