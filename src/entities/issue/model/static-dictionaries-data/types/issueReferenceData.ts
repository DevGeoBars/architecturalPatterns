import type { IssueReferenceDataItem } from './issueReferenceDataItem';

export interface IssueReferenceData {
  products: IssueReferenceDataItem[];
  categories: IssueReferenceDataItem[];
  osTypes: IssueReferenceDataItem[];
}