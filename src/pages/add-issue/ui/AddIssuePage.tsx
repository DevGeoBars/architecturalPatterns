import {
  useNavigate,
} from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
} from '@primereact/ui/button';

import type {
  Issue,
} from '@/entities/issue';
import { getIssuesQueryKey } from '@/entities/issue';

import {
  CreateIssueForm,
} from '@/features/create-issue';

import {
  APP_ROUTES,
  getIssueDetailRoute,
} from '@/shared/routes';

import './AddIssuePage.scss';

export const AddIssuePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreated = (
    issue: Issue,
  ): void => {
    void queryClient.invalidateQueries({ queryKey: getIssuesQueryKey() });
    navigate(
      getIssueDetailRoute(
        issue.id,
      ),
      {
        replace: true,
      },
    );
  };

  const handleBackToIssues =
    (): void => {
      navigate(
        APP_ROUTES.ISSUES,
      );
    };

  return (
    <section className="add-issue-page">
      <header className="add-issue-page__header">
        <h1>
          Создание обращения
        </h1>

        <Button
          type="button"
          onClick={
            handleBackToIssues
          }
        >
          К обращениям
        </Button>
      </header>

      <CreateIssueForm
        onCreated={
          handleCreated
        }
      />
    </section>
  );
};
