import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@primereact/ui/button';

import {
  getIssueQueryKey,
  getIssueQueryOptions,
  getIssuesQueryKey,
  ISSUE_API_TOKEN,
  isIssueEditable,
  type IIssueApi,
  type Issue,
} from '@/entities/issue';
import { EditIssueForm } from '@/features/edit-issue';
import { useService } from '@/shared/di';
import { APP_ROUTES, getIssueDetailRoute, getIssueEditRoute } from '@/shared/routes';
import { IssueCardWidget } from '@/widgets/issue-card';

import './IssuePage.scss';

export const IssuePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isEditRoute = useMatch(APP_ROUTES.ISSUE_EDIT) !== null;
  const issueApi = useService<IIssueApi>(ISSUE_API_TOKEN);
  const issueId = Number(id);
  const isValidIssueId = Number.isInteger(issueId) && issueId > 0;

  const { data: currentIssue, error, isPending, isError, refetch } = useQuery({
    ...getIssueQueryOptions(issueApi, isValidIssueId ? issueId : 0),
    enabled: isValidIssueId,
  });

  const handleIssueUpdated = (updatedIssue: Issue): void => {
    queryClient.setQueryData(getIssueQueryKey(updatedIssue.id), updatedIssue);
    void queryClient.invalidateQueries({ queryKey: getIssuesQueryKey() });
  };

  return (
    <section className="issue-page">
      <header className="issue-page__header">
        <h1>{isEditRoute ? 'Редактирование обращения' : 'Просмотр обращения'}</h1>
        <Button type="button" onClick={() => navigate(APP_ROUTES.ISSUES)}>К обращениям</Button>
      </header>

      {!isValidIssueId && (
        <div className="issue-page__state" role="alert">Некорректный идентификатор обращения</div>
      )}

      {isValidIssueId && isPending && (
        <div className="issue-page__state">Загрузка обращения...</div>
      )}

      {isValidIssueId && isError && (
        <div className="issue-page__state" role="alert">
          <p>{error.message}</p>
          <Button type="button" onClick={() => { void refetch(); }}>Повторить</Button>
        </div>
      )}

      {currentIssue !== undefined && !isEditRoute && (
        <div className="issue-page__content">
          {isIssueEditable(currentIssue) && (
            <div className="issue-page__actions">
              <Button type="button" onClick={() => navigate(getIssueEditRoute(currentIssue.id))}>
                Редактировать
              </Button>
            </div>
          )}
          <IssueCardWidget issue={currentIssue} onIssueUpdated={handleIssueUpdated} />
        </div>
      )}

      {currentIssue !== undefined && isEditRoute && (
        <EditIssueForm
          key={currentIssue.id}
          issue={currentIssue}
          onUpdated={(updatedIssue) => {
            handleIssueUpdated(updatedIssue);
            navigate(getIssueDetailRoute(updatedIssue.id), { replace: true });
          }}
          onCancel={() => navigate(getIssueDetailRoute(currentIssue.id), { replace: true })}
        />
      )}
    </section>
  );
};
