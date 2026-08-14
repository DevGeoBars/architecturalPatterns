import type { Comment } from '@/entities/issue';

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
    ? 'issue-card__message issue-card__message--own'
    : 'issue-card__message';

  return (
    <article className={className}>
      <div className="issue-card__message-header">
        <span className="issue-card__message-author">{comment.authorName}</span>

        <time dateTime={comment.createdAt.toISOString()}>
          {commentDateFormatter.format(comment.createdAt)}
        </time>
      </div>

      <p className="issue-card__message-content">{comment.content}</p>
    </article>
  );
};
