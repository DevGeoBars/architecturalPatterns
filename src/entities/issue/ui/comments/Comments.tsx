import type { Comment } from '../../model/issue/types/comment';

import { CommentMessage } from './CommentMessage';

import './Comments.scss';

interface IIssueCommentsProps {
  comments: Comment[];
  currentUserId: string | null;
}

export const Comments = ({ comments, currentUserId }: IIssueCommentsProps) => {
  if (comments.length === 0) {
    return <p className="issue-comments__empty">Комментариев пока нет</p>;
  }

  return (
    <div className="issue-comments">
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
