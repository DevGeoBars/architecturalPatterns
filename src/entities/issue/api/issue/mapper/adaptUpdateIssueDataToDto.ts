import type {
  UpdateIssueData,
} from '../../../model/issue/types/updateIssueData';

import type {
  UpdateIssueDto,
} from '../dto';

export const adaptUpdateIssueDataToDto = (
  data: UpdateIssueData,
): UpdateIssueDto => {
  return {
    Subject:
    data.subject,

    Content:
    data.content,

    Category:
    data.category,

    Status:
    data.statusCode,

    UserStatus:
    data.userStatusCode,

    Owner:
    data.owner,

    Severity:
    data.severity,

    Product:
    data.product,

    Version:
    data.version,

    OS:
    data.os,

    Type:
    data.type,

    Client:
    data.client,

    Organization:
    data.organization,

    CustomerTaxId:
    data.customerTaxId,

    CustomerOrganizationName:
    data.customerOrganizationName,

    IsClosedByUser:
    data.isClosedByUser,

    IsDemonstrated:
    data.isDemonstrated,
  };
};
