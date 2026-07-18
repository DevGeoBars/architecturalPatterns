import type { AttachedFileDto } from './attachedFileDto';
import type { CommentDto } from './commentDto';
import type { DirectionDto } from './directionDto';
import type { IssueLabelDto } from './issueLabelDto';
import type { ResponsibleDto } from './responsibleDto';
import type { SuggestionDto } from './suggestionDto';

export interface IssueDto {
  Id: string;

  Status: number;

  UserStatus: number;

  Number: string;

  Author?: string;

  AuthorEmail?: string;

  Category?: string;

  Owner?: string;

  CreatedAt?: string;

  UpdatedAt?: string;

  UpdatedBy?: string;

  Severity?: string;

  Subject?: string;

  Product?: string;

  Version?: string;

  OS?: string;

  Type?: string;

  Content?: string;

  Files?: AttachedFileDto[];

  Client?: string;

  Organization?: string;

  OrganizationId?: number;

  Responsible?: ResponsibleDto;

  Comments?: CommentDto[];

  RelatedIssues?: IssueDto[];

  RelatedSuggestions?: SuggestionDto[];

  Labels?: IssueLabelDto[] | null;

  Direction?: DirectionDto;

  DirectionName?: string;

  CustomerTaxId?: string;

  CustomerOrganizationName?: string;

  IsDemonstrated?: boolean;

  IsClosedByUser?: boolean;
}
