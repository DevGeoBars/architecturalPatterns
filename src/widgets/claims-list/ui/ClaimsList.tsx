import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Button,
} from '@primereact/ui/button';

import { CLAIM_API_TOKEN, getClaimsQueryOptions, type IClaimApi } from '@/entities/claim';
import { useService } from '@/shared/lib/di';

import {
  DataTable,
} from '@/shared/ui/DataTable';

import {
  CLAIMS_TABLE_COLUMNS,
} from '../config/claimsTableColumns';

import {
  adaptClaimsToTableRows,
} from '../lib/adaptClaimToTableRow';

import './ClaimsList.scss';

export const ClaimsList = () => {
  const claimApi = useService<IClaimApi>(CLAIM_API_TOKEN);
  const { data: claims = [], error, isPending, isError, refetch } = useQuery(
    getClaimsQueryOptions(claimApi),
  );

  const tableRows = useMemo(
    () =>
      adaptClaimsToTableRows(
        claims,
      ),
    [claims],
  );

  if (isPending) {
    return (
      <div className="claims-list__state">
        Загрузка заявок...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="claims-list__state"
        role="alert"
      >
        <p>
          {error.message}
        </p>

        <Button
          type="button"
          onClick={() => {
            void refetch();
          }}
        >
          Повторить
        </Button>
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="claims-list__state">
        <p>
          Заявки отсутствуют
        </p>

        <Button
          type="button"
          onClick={() => {
            void refetch();
          }}
        >
          Обновить
        </Button>
      </div>
    );
  }

  return (
    <div className="claims-list">
      <div className="claims-list__actions">
        <Button
          type="button"
          onClick={() => {
            void refetch();
          }}
        >
          Обновить
        </Button>
      </div>

      <DataTable
        rows={tableRows}
        columns={
          CLAIMS_TABLE_COLUMNS
        }
        minWidth="132rem"
        withGridlines
        withStripedRows
      />
    </div>
  );
};
