import type { IssueStaticDictionariesDto } from './issueStaticDictionariesDto';

export const isIssueStaticDictionariesDto = (
  value: unknown,
): value is IssueStaticDictionariesDto => {
  if (typeof value !== 'object' || value === null || !('Data' in value) || !Array.isArray(value.Data)) {
    return false;
  }

  return value.Data.every((item) => {
    return typeof item === 'object' && item !== null &&
      'Id' in item && typeof item.Id === 'number' &&
      'Name' in item && typeof item.Name === 'string' &&
      'Icon' in item && (typeof item.Icon === 'string' || item.Icon === null);
  });
};
