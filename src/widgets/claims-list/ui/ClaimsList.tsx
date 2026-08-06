import {
  useEffect,
  useMemo,
} from 'react';

import {
  Button,
} from '@primereact/ui/button';

import {
  DataTable,
} from '@/shared/ui/DataTable';

import {
  CLAIMS_TABLE_COLUMNS,
} from '../config/claimsTableColumns';

import {
  adaptClaimsToTableRows,
} from '../lib/adaptClaimToTableRow';

import {
  useClaimsStore,
} from '../model/context/useClaimsStore';

import './ClaimsList.scss';

export const ClaimsList = () => {
  const claims =
    useClaimsStore(
      (state) =>
        state.claims,
    );

  const requestStatus =
    useClaimsStore(
      (state) =>
        state.requestStatus,
    );

  const error =
    useClaimsStore(
      (state) =>
        state.error,
    );

  const loadClaims =
    useClaimsStore(
      (state) =>
        state.loadClaims,
    );

  const reloadClaims =
    useClaimsStore(
      (state) =>
        state.reloadClaims,
    );

  const tableRows = useMemo(
    () =>
      adaptClaimsToTableRows(
        claims,
      ),
    [claims],
  );

  useEffect(() => {
    void loadClaims();
  }, [loadClaims]);

  if (
    requestStatus === 'idle' ||
    requestStatus === 'loading'
  ) {
    return (
      <div className="claims-list__state">
        Загрузка заявок...
      </div>
    );
  }

  if (
    requestStatus === 'error'
  ) {
    return (
      <div
        className="claims-list__state"
        role="alert"
      >
        <p>
          {error ??
            'Не удалось загрузить заявки'}
        </p>

        <Button
          type="button"
          onClick={() => {
            void reloadClaims();
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
            void reloadClaims();
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
            void reloadClaims();
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
