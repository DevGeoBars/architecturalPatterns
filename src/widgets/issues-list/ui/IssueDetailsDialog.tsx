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
} from '@/entities/issue';

import {
  Dialog,
} from '@/shared/ui/Dialog';

import {
  useService,
} from '@/shared/lib/di';

import './IssueDetailsDialog.scss';

interface IIssueDetailsDialogProps {
  issueId: number | null;

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

  const [store] = useState(() =>
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

  const clearCurrentIssue =
    useStore(
      store,
      (state) =>
        state.clearCurrentIssue,
    );

  const isOpen =
    issueId !== null;

  useEffect(() => {
    if (issueId === null) {
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
    getCurrentIssue,
    clearCurrentIssue,
  ]);

  const handleRetry =
    (): void => {
      if (issueId === null) {
        return;
      }

      void getCurrentIssue(
        issueId,
      );
    };

  return (
    <Dialog
      isOpen={isOpen}
      title="Просмотр обращения"
      onClose={onClose}
    >
      {isOpen && (
        <>
          {(requestStatus ===
            'idle' ||
            requestStatus ===
            'loading') && (
            <div
              className={
                'issue-details-dialog__state'
              }
            >
              Загрузка обращения...
            </div>
          )}

          {requestStatus ===
            'error' && (
              <div
                className={
                  'issue-details-dialog__state'
                }
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
            null && (
              <IssueCard
                issue={
                  currentIssue
                }
              />
            )}
        </>
      )}
    </Dialog>
  );
};
