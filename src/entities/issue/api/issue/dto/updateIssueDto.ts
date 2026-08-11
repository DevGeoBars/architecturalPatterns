export interface UpdateIssueDto {
  Subject: string;

  Content: string;

  Category: string;

  Status: number;

  UserStatus: number;

  Owner: string;

  Severity: string;

  Product: string;

  Version: string;

  OS: string;

  Type: string;

  Client: string;

  Organization: string;

  CustomerTaxId: string;

  CustomerOrganizationName:
    string;

  IsClosedByUser: boolean;

  IsDemonstrated: boolean;
}
