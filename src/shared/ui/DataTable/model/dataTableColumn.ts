import type {
  ReactNode,
} from 'react';

export interface DataTableColumn<
  TRow extends object,
> {
  id: string;

  header: string;

  width?: string;

  renderCell: (
    row: TRow,
  ) => ReactNode;
}
