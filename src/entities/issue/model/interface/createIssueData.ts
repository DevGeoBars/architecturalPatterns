import type {
  TIssueStatusCode,
} from './issueStatus';
import type {
  TIssueUserStatusCode,
} from './issueUserStatus';

export interface CreateIssueData {
  subject: string;
  content: string;

  category: string;
  statusCode: TIssueStatusCode;
  userStatusCode: TIssueUserStatusCode;

  severity?: string;
  product?: string;
  version?: string;
  os?: string;
  type?: string;

  organization?: string;
  organizationId?: number;

  customerTaxId?: string;
  customerOrganizationName?: string;

  isDemonstrated?: boolean;
}
