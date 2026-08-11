import { storage } from '@/shared/lib/storage';

import type { IssueReferenceData } from '../../model/static-dictionaries-data/types/issueReferenceData';
import type { IssueReferenceDataItem } from '../../model/static-dictionaries-data/types/issueReferenceDataItem';

const STORAGE_KEY = 'IssueReferenceData:v1';

const isIssueReferenceDataItem = (
  value: unknown,
): value is IssueReferenceDataItem => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Partial<IssueReferenceDataItem>;

  return (
    typeof item.id === 'number' &&
    Number.isFinite(item.id) &&
    typeof item.name === 'string' &&
    (typeof item.icon === 'string' || item.icon === null)
  );
};

const isIssueReferenceData = (
  value: unknown,
): value is IssueReferenceData => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const data = value as Partial<IssueReferenceData>;

  return (
    Array.isArray(data.products) &&
    data.products.every(isIssueReferenceDataItem) &&
    Array.isArray(data.categories) &&
    data.categories.every(isIssueReferenceDataItem) &&
    Array.isArray(data.osTypes) &&
    data.osTypes.every(isIssueReferenceDataItem)
  );
};

export const getStoredIssueReferenceData = (): IssueReferenceData | null => {
  const storedData = storage.get<unknown>(STORAGE_KEY);

  if (storedData === null) {
    return null;
  }

  if (!isIssueReferenceData(storedData)) {
    storage.remove(STORAGE_KEY);
    return null;
  }

  return storedData;
};

export const setStoredIssueReferenceData = (
  data: IssueReferenceData,
): void => {
  storage.set(STORAGE_KEY, data);
};