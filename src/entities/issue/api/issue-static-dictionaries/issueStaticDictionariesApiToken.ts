import type {
  InjectionToken,
} from 'tsyringe';

import type {
  IIssueStaticDictionariesApi,
} from './issueStaticDictionariesApi';

export const ISSUE_STATIC_DICTIONARIES_API_TOKEN:
  InjectionToken<IIssueStaticDictionariesApi> =
  Symbol('ISSUE_STATIC_DICTIONARIES_API_TOKEN');
