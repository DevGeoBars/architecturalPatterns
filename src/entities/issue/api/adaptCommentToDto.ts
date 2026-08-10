import type {
  Comment,
} from '../model/interface/comment';

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
  CommentDto,
} from './dto';

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

  return Number(
    entry[0],
  ) as TIssueStatusCode;
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

  return Number(
    entry[0],
  ) as TIssueUserStatusCode;
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
