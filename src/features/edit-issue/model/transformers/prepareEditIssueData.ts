import type { UpdateIssueData } from '@/entities/issue';

export const prepareEditIssueData = (
  data: UpdateIssueData,
): UpdateIssueData => {
  return {
    ...data,
    subject: data.subject.trim(),
    content: data.content.trim(),
    category: data.category.trim(),
    owner: data.owner.trim(),
    severity: data.severity.trim(),
    product: data.product.trim(),
    version: data.version.trim(),
    os: data.os.trim(),
    type: data.type.trim(),
    client: data.client.trim(),
    organization: data.organization.trim(),
    customerTaxId: data.customerTaxId.trim(),
    customerOrganizationName: data.customerOrganizationName.trim(),
  };
};
