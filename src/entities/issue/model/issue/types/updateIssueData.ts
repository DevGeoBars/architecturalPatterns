import type {
  TIssueStatusCode,
} from './issueStatus';

import type {
  TIssueUserStatusCode,
} from './issueUserStatus';

export interface UpdateIssueData {
  subject: string;

  content: string;

  category: string;

  statusCode: TIssueStatusCode;

  userStatusCode: TIssueUserStatusCode;

  owner: string;

  severity: string;

  product: string;

  version: string;

  os: string;

  type: string;

  client: string;

  organization: string;

  customerTaxId: string;

  customerOrganizationName:
    string;

  isClosedByUser: boolean;

  isDemonstrated: boolean;
}
