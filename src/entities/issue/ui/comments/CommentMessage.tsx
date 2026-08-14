import type { Comment } from '../../model/issue/types/comment';

interface ICommentMessageProps {
  comment: Comment;
  isOwn: boolean;
}

const commentDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const CommentMessage = ({ comment, isOwn }: ICommentMessageProps) => {
  const className = isOwn
    ? 'issue-comments__message issue-comments__message--own'
    : 'issue-comments__message';

  return (
    <article className={className}>
      <div className="issue-comments__message-header">
        <span className="issue-comments__message-author">{comment.authorName}</span>

        <time dateTime={comment.createdAt.toISOString()}>
          {commentDateFormatter.format(comment.createdAt)}
        </time>
      </div>

      <p className="issue-comments__message-content">{comment.content}</p>
    </article>
  );
};
