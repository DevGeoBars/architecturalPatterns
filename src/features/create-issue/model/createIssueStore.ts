import {
  createStore,
  type StoreApi,
} from 'zustand/vanilla';

import type {
  IIssueApi,
} from '@/entities/issue';

import type {
  ICreateIssueState,
} from './createIssueState';

export type TCreateIssueStore =
  StoreApi<ICreateIssueState>;

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof Error
    ? error.message
    : 'Не удалось создать обращение';
};

export const createCreateIssueStore = (
  issueApi: IIssueApi,
): TCreateIssueStore => {
  return createStore<ICreateIssueState>(
    (set, get) => ({
      requestStatus: 'idle',

      error: null,

      createIssue: async (data) => {
        const { requestStatus } = get();

        if (
          requestStatus === 'loading'
        ) {
          return null;
        }

        set({
          requestStatus: 'loading',
          error: null,
        });

        try {
          const createdIssue =
            await issueApi.createIssue(
              data,
            );

          set({
            requestStatus: 'success',
            error: null,
          });

          return createdIssue;
        } catch (error: unknown) {
          set({
            requestStatus: 'error',

            error: getErrorMessage(
              error,
            ),
          });

          return null;
        }
      },
    }),
  );
};
