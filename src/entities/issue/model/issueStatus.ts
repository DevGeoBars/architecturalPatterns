export const ISSUE_STATUSES = {
  0: 'Новое',
  1: 'Первичная обработка',
  2: 'В работе',
  3: 'Выполнено',
  4: 'Закрыто',
  5: 'Требует уточнения',
  6: 'Пересмотр',
  7: 'Отложено',
  8: 'Проверка заказчиком',
  9: 'Отклонено',
} as const;

export type TIssueStatusCode =
  keyof typeof ISSUE_STATUSES;

export type TIssueStatus =
  (typeof ISSUE_STATUSES)[TIssueStatusCode];

export const getIssueStatus = (
  statusCode: number,
): TIssueStatus => {
  const status =
    ISSUE_STATUSES[
      statusCode as TIssueStatusCode
      ];

  if (!status) {
    throw new Error(
      `Неизвестный статус обращения: ${statusCode}`,
    );
  }

  return status;
};
