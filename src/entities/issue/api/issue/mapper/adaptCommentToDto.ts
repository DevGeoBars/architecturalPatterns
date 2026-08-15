import type {
  Comment,
} from '../../../model/issue/types/comment';

import {
  ISSUE_STATUSES,
  isIssueStatusCode,

  type TIssueStatus,
  type TIssueStatusCode,
} from '../../../model/issue/types/issueStatus';

import {
  ISSUE_USER_STATUSES,
  isIssueUserStatusCode,

  type TIssueUserStatus,
  type TIssueUserStatusCode,
} from '../../../model/issue/types/issueUserStatus';

import type {
  CommentDto,
} from '../dto';

const getIssueStatusCode = (
  status:
    TIssueStatus | null,
): TIssueStatusCode | null => {
  if (status === null) {
    return null;
  }

  const entry =
    Object.entries(
      ISSUE_STATUSES,
    ).find(
      ([, value]) =>
        value === status,
    );

  if (!entry) {
    throw new Error(
      `Не удалось определить код статуса "${status}"`,
    );
  }

  const statusCode = Number(entry[0]);

  if (!isIssueStatusCode(statusCode)) {
    throw new Error(`Неизвестный код статуса: ${entry[0]}`);
  }

  return statusCode;
};

const getIssueUserStatusCode = (
  status:
    TIssueUserStatus | null,
): TIssueUserStatusCode | null => {
  if (status === null) {
    return null;
  }

  const entry =
    Object.entries(
      ISSUE_USER_STATUSES,
    ).find(
      ([, value]) =>
        value === status,
    );

  if (!entry) {
    throw new Error(
      `Не удалось определить код пользовательского статуса "${status}"`,
    );
  }

  const statusCode = Number(entry[0]);

  if (!isIssueUserStatusCode(statusCode)) {
    throw new Error(`Неизвестный код пользовательского статуса: ${entry[0]}`);
  }

  return statusCode;
};

export const adaptCommentToDto = (
  comment: Comment,
): CommentDto => {
  return {
    Id:
    comment.id,

    CreatedAt:
      comment.createdAt
        .toISOString(),

    Content:
    comment.content,

    ExternalAuthorId:
    comment.externalAuthorId,

    AuthorId:
    comment.authorId,

    AuthorName:
    comment.authorName,

    IsForUser:
    comment.isForUser,

    Files:
      comment.files.map(
        (file) => ({
          Id: file.id,

          Name: file.name,
        }),
      ),

    Theme:
    comment.theme,

    Status:
      getIssueStatusCode(
        comment.status,
      ),

    UserStatus:
      getIssueUserStatusCode(
        comment.userStatus,
      ),
  };
};
