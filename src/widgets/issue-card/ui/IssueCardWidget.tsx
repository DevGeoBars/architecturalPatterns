import { type Issue, IssueCard } from '@/entities/issue';
import { useUserStore } from '@/entities/user';
import { AddCommentForm } from '@/features/add-comment';

import './IssueCardWidget.scss';

interface IIssueCardWidgetProps {
  issue: Issue;
  onIssueUpdated?: (issue: Issue) => void;
}

export const IssueCardWidget = ({ issue, onIssueUpdated }: IIssueCardWidgetProps) => {
  const currentUserId = useUserStore((state) => state.currentUser?.id ?? null);

  return (
    <section className="issue-widget" aria-label={`Обращение №${issue.number}`}>
      <div className={'issue-widget__details'}>
        <IssueCard issue={issue} currentUserId={currentUserId}/>
      </div>
      <div className="issue-card__comment-form">
        <AddCommentForm issue={issue} onAdded={onIssueUpdated}/>
      </div>
    </section>
  );
};
