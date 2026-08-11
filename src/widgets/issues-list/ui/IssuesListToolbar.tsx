import {
  useNavigate,
} from 'react-router-dom';

import {
  Button,
} from '@primereact/ui/button';

import {
  APP_ROUTES,
} from '@/shared/routes';

import './IssuesListToolbar.scss';

export const IssuesListToolbar = () => {
  const navigate = useNavigate();

  const handleCreateIssue =
    (): void => {
      navigate(
        APP_ROUTES.ISSUE_NEW,
      );
    };

  return (
    <div className="issues-list-toolbar">
      <Button
        type="button"
        onClick={
          handleCreateIssue
        }
      >
        Создать обращение
      </Button>
    </div>
  );
};