export interface CreateIssueDto {
  Subject: string;
  Content: string;

  Category: string;
  Status: number;
  UserStatus: number;

  Severity?: string;
  Product?: string;
  Version?: string;
  OS?: string;
  Type?: string;

  Organization?: string;
  OrganizationId?: number;

  CustomerTaxId?: string;
  CustomerOrganizationName?: string;

  IsDemonstrated?: boolean;
}
