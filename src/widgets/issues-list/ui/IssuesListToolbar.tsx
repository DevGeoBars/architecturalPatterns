import { useNavigate } from 'react-router-dom';

import {
  useIsFetching,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '@primereact/ui/button';

import { getIssuesQueryKey } from '@/entities/issue';
import { APP_ROUTES } from '@/shared/routes';

import './IssuesListToolbar.scss';

export const IssuesListToolbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const issuesQueryKey = getIssuesQueryKey();

  const isIssuesFetching = useIsFetching({
    queryKey: issuesQueryKey,
    exact: true,
  }) > 0;

  const handleCreateIssue = (): void => {
    navigate(APP_ROUTES.ISSUE_NEW);
  };

  const handleReloadIssues = (): void => {
    void queryClient.invalidateQueries({
      queryKey: issuesQueryKey,
      exact: true,
    });
  };

  return (
    <div className="issues-list-toolbar">
      <Button
        type="button"
        disabled={isIssuesFetching}
        onClick={handleReloadIssues}
      >
        Обновить
      </Button>

      <Button type="button" onClick={handleCreateIssue}>
        Создать обращение
      </Button>
    </div>
  );
};
