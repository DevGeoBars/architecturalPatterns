import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Button,
} from '@primereact/ui/button';

import {
  DataTable,
} from '@/shared/ui/DataTable';

import {
  ISSUES_TABLE_COLUMNS,
} from '../config/issuesTableColumns';

import {
  adaptIssuesToTableRows,
} from '../lib/adaptIssueToTableRow';

import type {
  IssueTableRow,
} from '../model/issueTableRow';

import {
  useIssuesStore,
} from '../model/context/useIssuesStore';

import {
  IssueDetailsDialog,
} from './IssueDetailsDialog';

import './IssuesList.scss';

export const IssuesList = () => {
  const issues =
    useIssuesStore(
      (state) =>
        state.issues,
    );

  const requestStatus =
    useIssuesStore(
      (state) =>
        state.requestStatus,
    );

  const error =
    useIssuesStore(
      (state) =>
        state.error,
    );

  const loadIssues =
    useIssuesStore(
      (state) =>
        state.loadIssues,
    );

  const reloadIssues =
    useIssuesStore(
      (state) =>
        state.reloadIssues,
    );

  const [
    viewedIssueId,
    setViewedIssueId,
  ] = useState<
    number | null
  >(null);

  const tableRows = useMemo(
    () =>
      adaptIssuesToTableRows(
        issues,
      ),
    [issues],
  );

  useEffect(() => {
    void loadIssues();
  }, [loadIssues]);

  const handleIssueDoubleClick = (
    row: IssueTableRow,
  ): void => {
    setViewedIssueId(
      row.id,
    );
  };

  const closeIssueDetails =
    (): void => {
      setViewedIssueId(
        null,
      );
    };

  if (
    requestStatus === 'idle' ||
    requestStatus === 'loading'
  ) {
    return (
      <div className="issues-list__state">
        Загрузка обращений...
      </div>
    );
  }

  if (
    requestStatus === 'error'
  ) {
    return (
      <div
        className="issues-list__state"
        role="alert"
      >
        <p>
          {error ??
            'Не удалось загрузить обращения'}
        </p>

        <Button
          type="button"
          onClick={() => {
            void reloadIssues();
          }}
        >
          Повторить
        </Button>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="issues-list__state">
        <p>
          Обращения отсутствуют
        </p>

        <Button
          type="button"
          onClick={() => {
            void reloadIssues();
          }}
        >
          Обновить
        </Button>
      </div>
    );
  }

  return (
    <div className="issues-list">
      <div className="issues-list__actions">
        <Button
          type="button"
          onClick={() => {
            void reloadIssues();
          }}
        >
          Обновить
        </Button>
      </div>

      <DataTable
        rows={tableRows}
        columns={
          ISSUES_TABLE_COLUMNS
        }
        minWidth="98rem"
        withGridlines
        withStripedRows
        onRowDoubleClick={
          handleIssueDoubleClick
        }
      />

      <IssueDetailsDialog
        issueId={
          viewedIssueId
        }
        onClose={
          closeIssueDetails
        }
      />
    </div>
  );
};
