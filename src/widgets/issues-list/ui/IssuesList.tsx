import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import {
  getIssuesQueryOptions,
  ISSUE_API_TOKEN,
  type IIssueApi,
} from '@/entities/issue';
import { useService } from '@/shared/di';
import { getIssueDetailRoute } from '@/shared/routes';
import { DataTable } from '@/shared/ui/DataTable';

import { ISSUES_TABLE_COLUMNS } from '../config/issuesTableColumns';
import { adaptIssuesToTableRows } from '../lib/adaptIssueToTableRow';
import type { IssueTableRow } from '../model/issueTableRow';

import './IssuesList.scss';

export const IssuesList = () => {
  const navigate = useNavigate();
  const issueApi = useService<IIssueApi>(ISSUE_API_TOKEN);

  const {
    data: issues = [],
    error,
    isError,
    isPending,
  } = useQuery(getIssuesQueryOptions(issueApi));

  const tableRows = useMemo(() => adaptIssuesToTableRows(issues), [issues]);

  const handleIssueDoubleClick = (row: IssueTableRow): void => {
    navigate(getIssueDetailRoute(row.id));
  };

  if (isPending) {
    return (
      <div className="issues-list issues-list__state">
        Загрузка обращений...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="issues-list issues-list__state" role="alert">
        <p>{error.message}</p>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="issues-list issues-list__state">
        <p>Обращения отсутствуют</p>
      </div>
    );
  }

  return (
    <div className="issues-list">
      <div className="issues-list__table">
        <DataTable
          rows={tableRows}
          columns={ISSUES_TABLE_COLUMNS}
          minWidth="98rem"
          withGridlines
          withStripedRows
          onRowDoubleClick={handleIssueDoubleClick}
        />
      </div>
    </div>
  );
};
