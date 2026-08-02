import type {
  CreateIssueData,
} from '../model/interface/createIssueData';

import type {
  CreateIssueDto,
} from './dto';

export const adaptCreateIssueDataToDto = (
  data: CreateIssueData,
): CreateIssueDto => ({
  Subject: data.subject,
  Content: data.content,

  Category: data.category,
  Status: data.statusCode,
  UserStatus: data.userStatusCode,

  Severity: data.severity,
  Product: data.product,
  Version: data.version,
  OS: data.os,
  Type: data.type,

  Organization: data.organization,
  OrganizationId: data.organizationId,

  CustomerTaxId: data.customerTaxId,
  CustomerOrganizationName:
  data.customerOrganizationName,

  IsDemonstrated: data.isDemonstrated,
});
