import type { IssueDto, IssueListDto } from '../dto';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isAttachedFileDto = (value: unknown): boolean =>
  isRecord(value) && typeof value.Id === 'number' && typeof value.Name === 'string';

const isCommentDto = (value: unknown): boolean =>
  isRecord(value) && (typeof value.Id === 'number' || typeof value.Id === 'string') &&
  typeof value.CreatedAt === 'string' && typeof value.Content === 'string' &&
  typeof value.AuthorId === 'string' && typeof value.AuthorName === 'string' &&
  typeof value.IsForUser === 'boolean' && Array.isArray(value.Files) &&
  value.Files.every(isAttachedFileDto);

const isOptionalArray = (
  value: unknown,
  itemGuard: (item: unknown) => boolean,
): boolean => value === undefined || (Array.isArray(value) && value.every(itemGuard));

const isIssueDto = (value: unknown): value is IssueDto => {
  return isRecord(value) &&
    typeof value.Id === 'string' &&
    typeof value.Number === 'string' &&
    typeof value.Status === 'number' &&
    typeof value.UserStatus === 'number' &&
    isOptionalArray(value.Files, isAttachedFileDto) &&
    isOptionalArray(value.Comments, isCommentDto) &&
    isOptionalArray(value.RelatedIssues, isIssueDto) &&
    isOptionalArray(value.RelatedSuggestions, (item) =>
      isRecord(item) && (typeof item.Id === 'number' || typeof item.Id === 'string') &&
      (typeof item.Number === 'number' || typeof item.Number === 'string') &&
      typeof item.Subject === 'string') &&
    (value.Labels === null || isOptionalArray(value.Labels, (item) =>
      isRecord(item) && typeof item.Id === 'number' && typeof item.Name === 'string' &&
      typeof item.Color === 'string' && (item.Message === null || typeof item.Message === 'string') &&
      typeof item.OwnerId === 'number' && typeof item.StatusCode === 'number'));
};

export const parseIssueDto = (value: unknown): IssueDto => {
  if (!isIssueDto(value)) {
    throw new Error('Сервер вернул некорректное обращение');
  }

  return value;
};

export const parseIssueListDto = (value: unknown): IssueListDto => {
  if (!isRecord(value) || !Array.isArray(value.Data) || typeof value.TotalCount !== 'number') {
    throw new Error('Сервер вернул некорректный список обращений');
  }

  if (!value.Data.every(isIssueDto)) {
    throw new Error('Список обращений содержит некорректные данные');
  }

  return { Data: value.Data, TotalCount: value.TotalCount };
};
