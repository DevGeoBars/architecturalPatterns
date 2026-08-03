import type {
  DataTableColumn,
} from '@/shared/ui/DataTable';

import type {
  IssueTableRow,
} from '../model/issueTableRow';

export const ISSUES_TABLE_COLUMNS = [
  {
    id: 'number',

    header: 'Номер',

    width: '10rem',

    renderCell: (
      row: IssueTableRow,
    ) => row.number,
  },

  {
    id: 'subject',

    header: 'Тема',

    width: '32rem',

    renderCell: (
      row: IssueTableRow,
    ) => row.subject,
  },

  {
    id: 'status',

    header: 'Статус',

    width: '18rem',

    renderCell: (
      row: IssueTableRow,
    ) => row.status,
  },

  {
    id: 'author',

    header: 'Автор',

    width: '24rem',

    renderCell: (
      row: IssueTableRow,
    ) => row.author,
  },

  {
    id: 'createdAt',

    header: 'Создана',

    width: '14rem',

    renderCell: (
      row: IssueTableRow,
    ) => row.createdAt,
  },
] satisfies readonly DataTableColumn<IssueTableRow>[];
