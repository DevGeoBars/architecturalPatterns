import type {
  DataTableColumn,
} from './dataTableColumn';

export interface IDataTableProps<
  TRow extends object,
> {
  rows: TRow[];

  columns:
    readonly DataTableColumn<TRow>[];

  minWidth?: string;

  withGridlines?: boolean;

  withStripedRows?: boolean;
}
