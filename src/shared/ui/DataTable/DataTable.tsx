import {
  DataTable as PrimeDataTable,
  type DataTableRowMouseEvent,
} from '@primereact/ui/datatable';

import {
  adaptDataTablePropsToPrimeReact,
} from './adapters/adaptDataTablePropsToPrimeReact';

import type {
  IDataTableProps,
} from './types/dataTable';

export function DataTable<
  TRow extends object,
>({
  rows,
  columns,
  minWidth = '48rem',
  withGridlines = true,
  withStripedRows = true,
  onRowDoubleClick,
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
      rowHover={
        onRowDoubleClick !==
        undefined
      }
      onRowDoubleClick={
        onRowDoubleClick
          ? (event: DataTableRowMouseEvent) => {
            const row = rows[event.index];

            if (row !== undefined) {
              onRowDoubleClick(row);
            }
          }
          : undefined
      }
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
            {({ index }) => {
              const row = rows[index];

              if (row === undefined) {
                return null;
              }

              return (
                <PrimeDataTable.Row
                  style={
                    onRowDoubleClick
                      ? {
                        cursor:
                          'pointer',
                      }
                      : undefined
                  }
                >
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
