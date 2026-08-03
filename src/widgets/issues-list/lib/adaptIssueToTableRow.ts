import type {
  Issue,
} from '@/entities/issue';

import type {
  IssueTableRow,
} from '../model/issueTableRow';

const issueDateFormatter =
  new Intl.DateTimeFormat(
    'ru-RU',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );

export const adaptIssueToTableRow = (
  issue: Issue,
): IssueTableRow => {
  return {
    id: issue.id,

    number: issue.number,

    subject:
      issue.subject ?? 'Без темы',

    status: issue.status,

    author:
      issue.author ?? '—',

    createdAt: issue.createdAt
      ? issueDateFormatter.format(
        issue.createdAt,
      )
      : '—',
  };
};

export const adaptIssuesToTableRows = (
  issues: Issue[],
): IssueTableRow[] => {
  return issues.map(
    adaptIssueToTableRow,
  );
};
