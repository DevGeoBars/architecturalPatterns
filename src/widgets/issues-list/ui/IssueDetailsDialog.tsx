import {
  useEffect,

  useState,
} from 'react';

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
  EditIssueForm,
} from '@/features/edit-issue';

import {
  useService,
} from '@/shared/lib/di';

import {
  Dialog,
} from '@/shared/ui/Dialog';

import {
  useIssuesStore,
} from '../model/context/useIssuesStore';

import './IssueDetailsDialog.scss';

interface IIssueDetailsDialogProps {
  issueId:
    number | null;

  onClose: () => void;
}

export const IssueDetailsDialog = ({
  issueId,

  onClose,
}: IIssueDetailsDialogProps) => {
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

  const [
    isEditing,

    setIsEditing,
  ] = useState(false);

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

  const updateIssueInList =
    useIssuesStore(
      (state) =>
        state.updateIssue,
    );

  const isOpen =
    issueId !== null;

  useEffect(() => {
    if (
      issueId === null
    ) {
      return;
    }

    setIsEditing(
      false,
    ); //todo@bars спорно

    void getCurrentIssue(
      issueId,
    );

    return () => {
      clearCurrentIssue();
    };
  }, [
    issueId,

    getCurrentIssue,

    clearCurrentIssue,
  ]);

  const handleClose =
    (): void => {
      setIsEditing(
        false,
      );

      clearCurrentIssue();

      onClose();
    };

  const handleRetry =
    (): void => {
      if (
        issueId === null
      ) {
        return;
      }

      void getCurrentIssue(
        issueId,
      );
    };

  const handleUpdated = (
    updatedIssue: Issue,
  ): void => {
    setCurrentIssue(
      updatedIssue,
    );

    updateIssueInList(
      updatedIssue,
    );

    setIsEditing(
      false,
    );
  };

  const dialogTitle =
    isEditing
      ? 'Редактирование обращения'
      : 'Просмотр обращения';

  return (
    <Dialog
      isOpen={
        isOpen
      }
      title={
        dialogTitle
      }
      onClose={
        handleClose
      }
    >
      {isOpen && (
        <div className="issue-details-dialog">
          {(requestStatus ===
            'idle' ||
            requestStatus ===
            'loading') && (
            <div className="issue-details-dialog__state">
              Загрузка обращения...
            </div>
          )}

          {requestStatus ===
            'error' && (
              <div
                className="issue-details-dialog__state"
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
            currentIssue !==
            null &&
            !isEditing && (
              <>
                <IssueCard
                  issue={
                    currentIssue
                  }
                />

                <div className="issue-details-dialog__actions">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(
                        true,
                      );
                    }}
                  >
                    Редактировать
                  </Button>
                </div>
              </>
            )}

          {requestStatus ===
            'success' &&
            currentIssue !==
            null &&
            isEditing && (
              <EditIssueForm
                key={
                  currentIssue.id
                }
                issue={
                  currentIssue
                }
                onUpdated={
                  handleUpdated
                }
                onCancel={() => {
                  setIsEditing(
                    false,
                  );
                }}
              />
            )}
        </div>
      )}
    </Dialog>
  );
};
