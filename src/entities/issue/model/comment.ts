import type { CommentDto } from '@/shared/api/endpoints/issue';

import {
  ISSUE_STATUSES,
  ISSUE_USER_STATUSES,
  type TCommentTheme,
  type TIssueStatus,
  type TIssueStatusCode,
  type TIssueUserStatus,
  type TIssueUserStatusCode,
} from './issue.types';

import {
  createAttachedFile,
  type AttachedFile,
} from './attachedFile';

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

export class Comment {
  id: number;

  createdAt: Date;

  content: string;

  externalAuthorId?: string;

  authorId: string;

  authorName: string;

  isForUser: boolean;

  files: AttachedFile[];

  theme: TCommentTheme;

  status: TIssueStatus | null;

  userStatus: TIssueUserStatus | null;

  constructor(dto: CommentDto) {
    this.id = Number(dto.Id);

    this.createdAt = new Date(dto.CreatedAt);

    this.content = dto.Content;

    this.externalAuthorId =
      dto.ExternalAuthorId;

    this.authorId = dto.AuthorId;

    this.authorName = dto.AuthorName;

    this.isForUser = dto.IsForUser;

    this.files = dto.Files.map(
      createAttachedFile,
    );

    this.theme = dto.Theme ?? '';

    this.status =
      dto.Status === undefined
        ? null
        : getIssueStatus(dto.Status);

    this.userStatus =
      dto.UserStatus === undefined
        ? null
        : getIssueUserStatus(
          dto.UserStatus,
        );
  }
}
