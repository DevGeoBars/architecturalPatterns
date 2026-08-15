import type {
  InjectionToken,
} from 'tsyringe';

import type {
  IIssueReferenceDataApi,
} from './issueReferenceDataApi';

export const ISSUE_REFERENCE_DATA_API_TOKEN:
  InjectionToken<IIssueReferenceDataApi> =
  Symbol('ISSUE_REFERENCE_DATA_API_TOKEN');
