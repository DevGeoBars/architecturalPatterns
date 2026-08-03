import {
  DataTable as PrimeDataTable,
} from '@primereact/ui/datatable';

import {
  adaptDataTablePropsToPrimeReact,
} from '../lib/adaptDataTablePropsToPrimeReact';

import type {
  IDataTableProps,
} from '../model/dataTable';

export function DataTable<
  TRow extends object,
>({
  rows,
  columns,
  minWidth = '48rem',
  withGridlines = true,
  withStripedRows = true,
}: IDataTableProps<TRow>) {
  const primeReactProps =
    adaptDataTablePropsToPrimeReact({
      rows,
      withGridlines,
      withStripedRows,
    });

  return (
    <PrimeDataTable.Root
      {...primeReactProps}
    >
      <PrimeDataTable.TableContainer>
        <PrimeDataTable.Table
          style={{
            minWidth,
          }}
        >
          <PrimeDataTable.THead>
            <PrimeDataTable.THeadRow>
              {columns.map(
                (column) => (
                  <PrimeDataTable.THeadCell
                    key={column.id}
                    style={
                      column.width
                        ? {
                          width:
                          column.width,
                        }
                        : undefined
                    }
                  >
                    {column.header}
                  </PrimeDataTable.THeadCell>
                ),
              )}
            </PrimeDataTable.THeadRow>
          </PrimeDataTable.THead>

          <PrimeDataTable.TBody>
            {({ item }) => {
              const row =
                item as TRow;

              return (
                <PrimeDataTable.Row>
                  {columns.map(
                    (column) => (
                      <PrimeDataTable.Cell
                        key={column.id}
                        style={
                          column.width
                            ? {
                              width:
                              column.width,
                            }
                            : undefined
                        }
                      >
                        {column.renderCell(
                          row,
                        )}
                      </PrimeDataTable.Cell>
                    ),
                  )}
                </PrimeDataTable.Row>
              );
            }}
          </PrimeDataTable.TBody>
        </PrimeDataTable.Table>
      </PrimeDataTable.TableContainer>
    </PrimeDataTable.Root>
  );
}
