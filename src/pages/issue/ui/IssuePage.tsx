import {
  useEffect,
  useState,
} from 'react';

import {
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  useStore,
} from 'zustand';

import {
  Button,
} from '@primereact/ui/button';

import {
  createIssueStore,
  ISSUE_API_TOKEN,
  IssueCard,

  type IIssueApi,
  type Issue,
} from '@/entities/issue';

import {
  AddCommentForm,
} from '@/features/add-comment';

import {
  EditIssueForm,
} from '@/features/edit-issue';

import {
  useService,
} from '@/shared/lib/di';

import {
  APP_ROUTES,
  getIssueDetailRoute,
  getIssueEditRoute,
} from '@/shared/routes';

import './IssuePage.scss';

export const IssuePage = () => {
  const navigate = useNavigate();

  const {
    id,
  } = useParams<{
    id: string;
  }>();

  const isEditRoute =
    useMatch(
      APP_ROUTES.ISSUE_EDIT,
    ) !== null;

  const issueApi =
    useService<IIssueApi>(
      ISSUE_API_TOKEN,
    );

  const [store] = useState(
    () =>
      createIssueStore(
        issueApi,
      ),
  );

  const currentIssue =
    useStore(
      store,
      (state) =>
        state.currentIssue,
    );

  const requestStatus =
    useStore(
      store,
      (state) =>
        state.requestStatus,
    );

  const error =
    useStore(
      store,
      (state) =>
        state.error,
    );

  const getCurrentIssue =
    useStore(
      store,
      (state) =>
        state.getCurrentIssue,
    );

  const setCurrentIssue =
    useStore(
      store,
      (state) =>
        state.setCurrentIssue,
    );

  const clearCurrentIssue =
    useStore(
      store,
      (state) =>
        state.clearCurrentIssue,
    );

  const issueId = Number(id);

  const isValidIssueId =
    Number.isInteger(
      issueId,
    ) && issueId > 0;

  useEffect(() => {
    if (!isValidIssueId) {
      clearCurrentIssue();

      return;
    }

    void getCurrentIssue(
      issueId,
    );

    return () => {
      clearCurrentIssue();
    };
  }, [
    issueId,
    isValidIssueId,
    getCurrentIssue,
    clearCurrentIssue,
  ]);

  const handleBackToIssues =
    (): void => {
      navigate(
        APP_ROUTES.ISSUES,
      );
    };

  const handleRetry =
    (): void => {
      if (!isValidIssueId) {
        return;
      }

      void getCurrentIssue(
        issueId,
      );
    };

  /**
   * И add-comment, и edit-issue возвращают
   * уже обновлённую сущность Issue.
   *
   * Поэтому странице достаточно заменить
   * currentIssue в своём локальном issueStore.
   */
  const handleIssueUpdated = (
    updatedIssue: Issue,
  ): void => {
    setCurrentIssue(
      updatedIssue,
    );
  };

  const handleEdit =
    (): void => {
      if (
        currentIssue === null
      ) {
        return;
      }

      navigate(
        getIssueEditRoute(
          currentIssue.id,
        ),
      );
    };

  const handleEditCancel =
    (): void => {
      if (!isValidIssueId) {
        return;
      }

      navigate(
        getIssueDetailRoute(
          issueId,
        ),
        {
          replace: true,
        },
      );
    };

  const handleEditUpdated = (
    updatedIssue: Issue,
  ): void => {
    setCurrentIssue(
      updatedIssue,
    );

    navigate(
      getIssueDetailRoute(
        updatedIssue.id,
      ),
      {
        replace: true,
      },
    );
  };

  return (
    <section className="issue-page">
      <header className="issue-page__header">
        <h1>
          {isEditRoute
            ? 'Редактирование обращения'
            : 'Просмотр обращения'}
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

      {!isValidIssueId && (
        <div
          className="issue-page__state"
          role="alert"
        >
          Некорректный идентификатор обращения
        </div>
      )}

      {isValidIssueId &&
        (requestStatus ===
          'idle' ||
          requestStatus ===
          'loading') && (
          <div className="issue-page__state">
            Загрузка обращения...
          </div>
        )}

      {isValidIssueId &&
        requestStatus ===
        'error' && (
          <div
            className="issue-page__state"
            role="alert"
          >
            <p>
              {error ??
                'Не удалось загрузить обращение'}
            </p>

            <Button
              type="button"
              onClick={
                handleRetry
              }
            >
              Повторить
            </Button>
          </div>
        )}

      {requestStatus ===
        'success' &&
        currentIssue !== null &&
        !isEditRoute && (
          <div className="issue-page__content">
            <div className="issue-page__actions">
              <Button
                type="button"
                onClick={
                  handleEdit
                }
              >
                Редактировать
              </Button>
            </div>

            <IssueCard
              issue={
                currentIssue
              }
            />

            <section className="issue-page__comment">
              <h2>
                Добавить комментарий
              </h2>

              <AddCommentForm
                issue={
                  currentIssue
                }
                onAdded={
                  handleIssueUpdated
                }
              />
            </section>
          </div>
        )}

      {requestStatus ===
        'success' &&
        currentIssue !== null &&
        isEditRoute && (
          <EditIssueForm
            key={
              currentIssue.id
            }
            issue={
              currentIssue
            }
            onUpdated={
              handleEditUpdated
            }
            onCancel={
              handleEditCancel
            }
          />
        )}
    </section>
  );
};