import type {
  AttachedFile,
} from '../model/interface/attachedFile';
import type {
  Comment,
  TCommentTheme,
} from '../model/interface/comment';
import type {
  Direction,
} from '../model/interface/direction';
import type {
  Issue,
} from '../model/interface/issue';
import type {
  IssueLabel,
} from '../model/interface/issueLabel';
import {
  ISSUE_STATUSES,
  type TIssueStatus,
  type TIssueStatusCode,
} from '../model/interface/issueStatus';
import {
  ISSUE_USER_STATUSES,
  type TIssueUserStatus,
  type TIssueUserStatusCode,
} from '../model/interface/issueUserStatus';
import type {
  Responsible,
} from '../model/interface/responsible';
import type {
  Suggestion,
} from '../model/interface/suggestion';

import type {
  AttachedFileDto,
  CommentDto,
  DirectionDto,
  IssueDto,
  IssueLabelDto,
  ResponsibleDto,
  SuggestionDto,
} from './dto';

const adaptIssueStatus = (
  statusCode: number,
): TIssueStatus => {
  const status =
    ISSUE_STATUSES[
      statusCode as TIssueStatusCode
      ];

  if (status === undefined) {
    throw new Error(
      `Неизвестный статус обращения: ${statusCode}`,
    );
  }

  return status;
};

const adaptIssueUserStatus = (
  statusCode: number,
): TIssueUserStatus => {
  const status =
    ISSUE_USER_STATUSES[
      statusCode as TIssueUserStatusCode
      ];

  if (status === undefined) {
    throw new Error(
      `Неизвестный пользовательский статус: ${statusCode}`,
    );
  }

  return status;
};

const adaptAttachedFileDto = (
  dto: AttachedFileDto,
): AttachedFile => ({
  id: dto.Id,
  name: dto.Name,
});

const adaptDirectionDto = (
  dto: DirectionDto,
): Direction => ({
  id: dto.Id,
  name: dto.Name,
});

const adaptIssueLabelDto = (
  dto: IssueLabelDto,
): IssueLabel => ({
  id: dto.Id,
  name: dto.Name,
  color: dto.Color,
  message: dto.Message,
  ownerId: dto.OwnerId,
  statusCode: dto.StatusCode,
});

const adaptResponsibleDto = (
  dto: ResponsibleDto,
): Responsible => ({
  id: dto.Id,
  firstName: dto.FirstName,
  lastName: dto.LastName,
  fatherName: dto.FatherName,
  email: dto.Email,
});

const adaptSuggestionDto = (
  dto: SuggestionDto,
): Suggestion => ({
  id: Number(dto.Id),
  number: Number(dto.Number),
  subject: dto.Subject,
});

const adaptCommentDto = (
  dto: CommentDto,
): Comment => ({
  id: Number(dto.Id),
  createdAt: new Date(dto.CreatedAt),
  content: dto.Content,
  externalAuthorId:
  dto.ExternalAuthorId,
  authorId: dto.AuthorId,
  authorName: dto.AuthorName,
  isForUser: dto.IsForUser,
  files: dto.Files.map(
    adaptAttachedFileDto,
  ),
  theme: (dto.Theme ?? '') as TCommentTheme,
  status:
    dto.Status == null
      ? null
      : adaptIssueStatus(dto.Status),
  userStatus:
    dto.UserStatus == null
      ? null
      : adaptIssueUserStatus(
        dto.UserStatus,
      ),
});

export const adaptIssueDto = (
  dto: IssueDto,
): Issue => ({
  id: Number(dto.Id),
  number: Number(dto.Number),

  statusCode: dto.Status,
  status: adaptIssueStatus(dto.Status),

  userStatusCode: dto.UserStatus,
  userStatus: adaptIssueUserStatus(
    dto.UserStatus,
  ),

  isClosedByUser:
    dto.IsClosedByUser ?? false,

  author: dto.Author,
  authorEmail: dto.AuthorEmail,
  category:
    dto.Category ?? 'Запрос информации',
  owner: dto.Owner,

  createdAt: dto.CreatedAt
    ? new Date(dto.CreatedAt)
    : undefined,

  updatedAt: dto.UpdatedAt
    ? new Date(dto.UpdatedAt)
    : undefined,

  updatedBy: dto.UpdatedBy,

  severity: dto.Severity,
  subject: dto.Subject,
  product: dto.Product,
  version: dto.Version,
  os: dto.OS,
  type: dto.Type,
  content: dto.Content,

  files: (dto.Files ?? []).map(
    adaptAttachedFileDto,
  ),

  client: dto.Client,
  organization: dto.Organization,
  organizationId: dto.OrganizationId,

  responsible: dto.Responsible
    ? adaptResponsibleDto(
      dto.Responsible,
    )
    : undefined,

  comments: (dto.Comments ?? []).map(
    adaptCommentDto,
  ),

  relatedIssues:
    (dto.RelatedIssues ?? []).map(
      adaptIssueDto,
    ),

  relatedSuggestions:
    (
      dto.RelatedSuggestions ?? []
    ).map(adaptSuggestionDto),

  labels: (dto.Labels ?? []).map(
    adaptIssueLabelDto,
  ),

  direction: dto.Direction
    ? adaptDirectionDto(dto.Direction)
    : undefined,

  directionName:
    dto.DirectionName ??
    dto.Direction?.Name,

  customerTaxId:
  dto.CustomerTaxId,

  customerOrganizationName:
  dto.CustomerOrganizationName,

  isDemonstrated:
    dto.IsDemonstrated ?? false,
});
