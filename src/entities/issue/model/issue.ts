import type { IssueDto } from '@/shared/api/endpoints/issue';

import {
  createAttachedFile,
  type AttachedFile,
} from './attachedFile';

import { Comment } from './comment';

import {
  createDirection,
  type Direction,
} from './direction';

import {
  ISSUE_STATUSES,
  ISSUE_USER_STATUSES,
  type TIssueStatus,
  type TIssueStatusCode,
  type TIssueUserStatus,
  type TIssueUserStatusCode,
} from './issue.types';

import {
  createIssueLabel,
  type IssueLabel,
} from './issueLabel';

import { Responsible } from './responsible';
import { Suggestion } from './suggestion';

const getIssueStatus = (
  status: number,
): TIssueStatus => {
  const issueStatus =
    ISSUE_STATUSES[status as TIssueStatusCode];

  if (!issueStatus) {
    throw new Error(
      `Неизвестный статус обращения: ${status}`,
    );
  }

  return issueStatus;
};

const getIssueUserStatus = (
  status: number,
): TIssueUserStatus => {
  const userStatus =
    ISSUE_USER_STATUSES[
      status as TIssueUserStatusCode
      ];

  if (!userStatus) {
    throw new Error(
      `Неизвестный пользовательский статус: ${status}`,
    );
  }

  return userStatus;
};

export class Issue {
  id: number;

  number: number;

  statusCode: number;

  status: TIssueStatus;

  userStatusCode: number;

  userStatus: TIssueUserStatus;

  isClosedByUser: boolean;

  author?: string;

  authorEmail?: string;

  category: string;

  owner?: string;

  createdAt?: Date;

  updatedAt?: Date;

  updatedBy?: string;

  severity?: string;

  subject?: string;

  product?: string;

  version?: string;

  os?: string;

  type?: string;

  content?: string;

  files: AttachedFile[];

  client?: string;

  organization?: string;

  organizationId?: number;

  responsible?: Responsible;

  comments: Comment[];

  relatedIssues: Issue[];

  relatedSuggestions: Suggestion[];

  labels: IssueLabel[];

  direction?: Direction;

  directionName?: string;

  customerTaxId?: string;

  customerOrganizationName?: string;

  isDemonstrated: boolean;

  constructor(dto: IssueDto) {
    this.id = Number(dto.Id);

    this.number = Number(dto.Number);

    this.statusCode = dto.Status;

    this.status = getIssueStatus(
      dto.Status,
    );

    this.userStatusCode =
      dto.UserStatus;

    this.userStatus =
      getIssueUserStatus(
        dto.UserStatus,
      );

    this.isClosedByUser =
      dto.IsClosedByUser ?? false;

    this.author = dto.Author;

    this.authorEmail =
      dto.AuthorEmail;

    this.category =
      dto.Category ??
      'Запрос информации';

    this.owner = dto.Owner;

    this.createdAt = dto.CreatedAt
      ? new Date(dto.CreatedAt)
      : undefined;

    this.updatedAt = dto.UpdatedAt
      ? new Date(dto.UpdatedAt)
      : undefined;

    this.updatedBy = dto.UpdatedBy;

    this.severity = dto.Severity;

    this.subject = dto.Subject;

    this.product = dto.Product;

    this.version = dto.Version;

    this.os = dto.OS;

    this.type = dto.Type;

    this.content = dto.Content;

    this.files = (
      dto.Files ?? []
    ).map(createAttachedFile);

    this.client = dto.Client;

    this.organization =
      dto.Organization;

    this.organizationId =
      dto.OrganizationId;

    this.responsible =
      dto.Responsible
        ? new Responsible(
          dto.Responsible,
        )
        : undefined;

    this.comments = (
      dto.Comments ?? []
    ).map(
      (comment) =>
        new Comment(comment),
    );

    this.relatedIssues = (
      dto.RelatedIssues ?? []
    ).map(
      (issue) =>
        new Issue(issue),
    );

    this.relatedSuggestions = (
      dto.RelatedSuggestions ?? []
    ).map(
      (suggestion) =>
        new Suggestion(suggestion),
    );

    this.labels = (
      dto.Labels ?? []
    ).map(createIssueLabel);

    this.direction =
      dto.Direction
        ? createDirection(
          dto.Direction,
        )
        : undefined;

    this.directionName =
      dto.DirectionName ??
      dto.Direction?.Name;

    this.customerTaxId =
      dto.CustomerTaxId;

    this.customerOrganizationName =
      dto.CustomerOrganizationName;

    this.isDemonstrated =
      dto.IsDemonstrated ?? false;
  }

  static getUserStatusName(
    status: TIssueUserStatusCode,
  ): TIssueUserStatus {
    return ISSUE_USER_STATUSES[
      status
      ];
  }

  isClosed(): boolean {
    return this.status === 'Закрыто';
  }
}
