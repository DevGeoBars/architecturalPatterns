import { IssueDetails, type Issue } from '@/entities/issue';
import { useUserStore } from '@/entities/user';
import { AddCommentForm } from '@/features/add-comment';

import { IssueComments } from './IssueComments';

import './IssueCardWidget.scss';

interface IIssueCardWidgetProps {
  issue: Issue;
  onIssueUpdated?: (issue: Issue) => void;
}

export const IssueCardWidget = ({ issue, onIssueUpdated }: IIssueCardWidgetProps) => {
  const currentUserId = useUserStore((state) => state.currentUser?.id ?? null);

  return (
    <section className="issue-card" aria-label={`Обращение №${issue.number}`}>
      <IssueDetails issue={issue} />

      <section className="issue-card__comments">
        <h3 className="issue-card__comments-title">Комментарии</h3>

        <IssueComments comments={issue.comments} currentUserId={currentUserId} />

        <div className="issue-card__comment-form">
          <AddCommentForm issue={issue} onAdded={onIssueUpdated} />
        </div>
      </section>
    </section>
  );
};
