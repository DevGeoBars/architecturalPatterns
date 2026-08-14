import type { Comment } from '@/entities/issue';

import { CommentMessage } from './CommentMessage';

interface IIssueCommentsProps {
  comments: Comment[];
  currentUserId: string | null;
}

export const IssueComments = ({ comments, currentUserId }: IIssueCommentsProps) => {
  if (comments.length === 0) {
    return <p className="issue-card__comments-empty">Комментариев пока нет</p>;
  }

  return (
    <div className="issue-card__messages">
      {comments.map((comment) => (
          <CommentMessage
            key={comment.id}
        comment={comment}
        isOwn={currentUserId !== null && comment.authorId === currentUserId}
  />
))}
  </div>
);
};
