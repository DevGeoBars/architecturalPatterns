import { useNavigate } from 'react-router-dom';

import { Button } from '@primereact/ui/button';

import { APP_ROUTES } from '@/shared/routes';

import { useIssuesStore } from '../model/context/useIssuesStore';

import './IssuesListToolbar.scss';

export const IssuesListToolbar = () => {
  const navigate = useNavigate();
  const requestStatus = useIssuesStore((state) => state.requestStatus);
  const reloadIssues = useIssuesStore((state) => state.reloadIssues);

  const handleCreateIssue = (): void => {
    navigate(APP_ROUTES.ISSUE_NEW);
  };

  const handleReloadIssues = (): void => {
    void reloadIssues();
  };

  return (
    <div className="issues-list-toolbar">
      <Button
        type="button"
        disabled={requestStatus === 'loading'}
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
