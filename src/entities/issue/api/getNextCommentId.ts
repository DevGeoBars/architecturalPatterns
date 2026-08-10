import type {
  Comment,
} from '../model/interface/comment';

/**
 * Сейчас комментарии обновляются как часть
 * полного массива Issue.Comments и отдельного
 * POST /comments нет.
 *
 * Поэтому ID нового комментария временно
 * формируется на клиенте.
 *
 * Когда сервер начнёт сам создавать Comment,
 * этот helper можно будет удалить.
 */
export const getNextCommentId = (
  comments: Comment[],
): number => {
  const maxId =
    comments.reduce(
      (
        currentMax,

        comment,
      ) => {
        return Math.max(
          currentMax,

          comment.id,
        );
      },

      0,
    );

  return maxId + 1;
};

//todo@bars - времено по идеи должен сервер давать
