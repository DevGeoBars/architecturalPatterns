import type {
  Issue,

  TIssueStatusCode,

  TIssueUserStatusCode,

  UpdateIssueData,
} from '@/entities/issue';

export const createEditIssueInitialData = (
  issue: Issue,
): UpdateIssueData => {
  return {
    subject:
      issue.subject ?? '',

    content:
      issue.content ?? '',

    category:
    issue.category,

    statusCode:
      issue.statusCode as
        TIssueStatusCode,

    userStatusCode:
      issue.userStatusCode as
        TIssueUserStatusCode,

    owner:
      issue.owner ?? '',

    severity:
      issue.severity ?? '',

    product:
      issue.product ?? '',

    version:
      issue.version ?? '',

    os:
      issue.os ?? '',

    type:
      issue.type ?? '',

    client:
      issue.client ?? '',

    organization:
      issue.organization ?? '',

    customerTaxId:
      issue.customerTaxId ?? '',

    customerOrganizationName:
      issue.customerOrganizationName ??
      '',

    isClosedByUser:
    issue.isClosedByUser,

    isDemonstrated:
    issue.isDemonstrated,
  };
};
