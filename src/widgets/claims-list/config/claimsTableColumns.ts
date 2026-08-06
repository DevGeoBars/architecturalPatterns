import type {
  DataTableColumn,
} from '@/shared/ui/DataTable';

import type {
  ClaimTableRow,
} from '../model/claimTableRow';

export const CLAIMS_TABLE_COLUMNS = [
  {
    id: 'id',

    header: 'ID',

    width: '6rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.id,
  },

  {
    id: 'organizationName',

    header: 'Организация',

    width: '20rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.organizationName,
  },

  {
    id: 'inn',

    header: 'ИНН',

    width: '12rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.inn,
  },

  {
    id: 'location',

    header: 'Страна / город',

    width: '16rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.location,
  },

  {
    id: 'contact',

    header: 'Контакт',

    width: '20rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.contact,
  },

  {
    id: 'state',

    header: 'Статус',

    width: '16rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.state,
  },

  {
    id: 'probability',

    header: 'Вероятность',

    width: '10rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.probability,
  },

  {
    id: 'implementationPeriod',

    header: 'Срок реализации',

    width: '14rem',

    renderCell: (
      row: ClaimTableRow,
    ) =>
      row.implementationPeriod,
  },

  {
    id: 'totalCost',

    header:
      'Предварительная стоимость',

    width: '18rem',

    renderCell: (
      row: ClaimTableRow,
    ) => row.totalCost,
  },
] satisfies readonly DataTableColumn<ClaimTableRow>[];
