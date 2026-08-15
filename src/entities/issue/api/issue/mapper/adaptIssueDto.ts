import type {
  AttachedFile,
} from '../../../model/issue/types/attachedFile';
import type {
  Comment,
  TCommentTheme,
} from '../../../model/issue/types/comment';
import type {
  Direction,
} from '../../../model/issue/types/direction';
import type {
  Issue,
} from '../../../model/issue/types/issue';
import type {
  IssueLabel,
} from '../../../model/issue/types/issueLabel';
import {
  ISSUE_STATUSES,
  isIssueStatusCode,
  type TIssueStatus,
} from '../../../model/issue/types/issueStatus';
import {
  ISSUE_USER_STATUSES,
  isIssueUserStatusCode,
  type TIssueUserStatus,
} from '../../../model/issue/types/issueUserStatus';
import type {
  Responsible,
} from '../../../model/issue/types/responsible';
import type {
  Suggestion,
} from '../../../model/issue/types/suggestion';

import type {
  AttachedFileDto,
  CommentDto,
  DirectionDto,
  IssueDto,
  IssueLabelDto,
  ResponsibleDto,
  SuggestionDto,
} from '../dto';

const adaptIssueStatus = (
  statusCode: number,
): TIssueStatus => {
  if (!isIssueStatusCode(statusCode)) {
    throw new Error(
      `Неизвестный статус обращения: ${statusCode}`,
    );
  }
  return ISSUE_STATUSES[statusCode];
};

const adaptIssueUserStatus = (
  statusCode: number,
): TIssueUserStatus => {
  if (!isIssueUserStatusCode(statusCode)) {
    throw new Error(
      `Неизвестный пользовательский статус: ${statusCode}`,
    );
  }
  return ISSUE_USER_STATUSES[statusCode];
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

const adaptCommentTheme = (theme: string | undefined): TCommentTheme => {
  const normalizedTheme = theme ?? '';

  switch (normalizedTheme) {
    case 'Новый комментарий':
    case 'Изменение статуса':
    case 'Закрытие обращения пользователем':
    case '':
      return normalizedTheme;
    default:
      throw new Error(`Неизвестная тема комментария: ${normalizedTheme}`);
  }
};

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
  theme: adaptCommentTheme(dto.Theme),
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
