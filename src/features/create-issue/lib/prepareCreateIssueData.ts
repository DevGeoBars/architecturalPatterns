import type {
  CreateIssueData,
} from '@/entities/issue';

const normalizeOptionalString = (
  value: string | undefined,
): string | undefined => {
  const normalizedValue =
    value?.trim();

  return normalizedValue
    ? normalizedValue
    : undefined;
};

export const prepareCreateIssueData = (
  data: CreateIssueData,
): CreateIssueData => {
  return {
    ...data,

    subject: data.subject.trim(),

    content: data.content.trim(),

    category:
      data.category.trim(),

    severity:
      normalizeOptionalString(
        data.severity,
      ),

    product:
      normalizeOptionalString(
        data.product,
      ),

    version:
      normalizeOptionalString(
        data.version,
      ),

    os:
      normalizeOptionalString(
        data.os,
      ),

    type:
      normalizeOptionalString(
        data.type,
      ),

    organization:
      normalizeOptionalString(
        data.organization,
      ),

    customerTaxId:
      normalizeOptionalString(
        data.customerTaxId,
      ),

    customerOrganizationName:
      normalizeOptionalString(
        data.customerOrganizationName,
      ),
  };
};
