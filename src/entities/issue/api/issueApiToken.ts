import type {
  InjectionToken,
} from 'tsyringe';

import type {
  IIssueApi,
} from './issueApi';

export const ISSUE_API_TOKEN:
  InjectionToken<IIssueApi> =
  Symbol('ISSUE_API_TOKEN');
