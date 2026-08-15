import type {
  IDataTableProps,
} from '../types/dataTable';

type TAdaptedDataTableProps<
  TRow extends object,
> = {
  data: TRow[];

  showGridlines: boolean;

  stripedRows: boolean;
};

export const adaptDataTablePropsToPrimeReact = <
  TRow extends object,
>(
  props: Pick<
    IDataTableProps<TRow>,
    | 'rows'
    | 'withGridlines'
    | 'withStripedRows'
  >,
): TAdaptedDataTableProps<TRow> => {
  return {
    data: props.rows,

    showGridlines:
      props.withGridlines ?? true,

    stripedRows:
      props.withStripedRows ?? true,


  };
};
