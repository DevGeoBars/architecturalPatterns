import type {
  CreateCommentData,
} from '../../../model/issue/types/createCommentData';

import type {
  CommentDto,
} from '../dto';

export const adaptCreateCommentDataToDto = (
  data:
  CreateCommentData,

  commentId: number,
): CommentDto => {
  return {
    Id:
    commentId,

    CreatedAt:
      new Date()
        .toISOString(),

    Content:
    data.content,

    AuthorId:
    data.authorId,

    AuthorName:
    data.authorName,

    IsForUser: true,

    Files: [],

    Theme:
      'Новый комментарий',

    Status: null,

    UserStatus: null,
  };
};
