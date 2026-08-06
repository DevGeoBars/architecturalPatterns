import {
  createStore,
  type StoreApi,
} from 'zustand/vanilla';

import type {
  IClaimApi,
} from '../api';

import type {
  Claim,
} from './claim';

export type TClaimsListRequestStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export interface IClaimsState {
  claims: Claim[];

  requestStatus:
    TClaimsListRequestStatus;

  error: string | null;

  loadClaims: () => Promise<void>;

  reloadClaims:
    () => Promise<void>;
}

export type TClaimsStore =
  StoreApi<IClaimsState>;

const getErrorMessage = (
  error: unknown,
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить заявки';
};

export const createClaimsStore = (
  claimApi: IClaimApi,
): TClaimsStore => {
  return createStore<IClaimsState>(
    (set, get) => {
      const fetchClaims =
        async (): Promise<void> => {
          set({
            requestStatus:
              'loading',

            error: null,
          });

          try {
            const claims =
              await claimApi.getClaims();

            set({
              claims,

              requestStatus:
                'success',

              error: null,
            });
          } catch (
            error: unknown
            ) {
            set({
              requestStatus:
                'error',

              error:
                getErrorMessage(
                  error,
                ),
            });
          }
        };

      return {
        claims: [],

        requestStatus: 'idle',

        error: null,

        loadClaims: async () => {
          const {
            requestStatus,
          } = get();

          if (
            requestStatus !== 'idle'
          ) {
            return;
          }

          await fetchClaims();
        },

        reloadClaims:
        fetchClaims,
      };
    },
  );
};
