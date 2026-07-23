import {
  createStore,
  type StoreApi,
} from 'zustand/vanilla';

import type {
  IIssueApi,
} from '../api';
import type { Issue } from "./interface/issue";

export type TIssuesListRequestStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export interface IIssuesListState {
  issues: Issue[];
  requestStatus: TIssuesListRequestStatus;
  error: string | null;

  loadIssues: () => Promise<void>;
  reloadIssues: () => Promise<void>;
}

export type TIssuesListStore =
  StoreApi<IIssuesListState>;

const getErrorMessage = (
  error: unknown,
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить заявки';
};

export const createIssuesListStore = (
  issueApi: IIssueApi,
): TIssuesListStore => {
  return createStore<IIssuesListState>(
    (set, get) => {
      const fetchIssues = async (): Promise<void> => {
        set({
          requestStatus: 'loading',
          error: null,
        });

        try {
          const issues =
            await issueApi.getIssues();

          set({
            issues,
            requestStatus: 'success',
          });
        } catch (error: unknown) {
          set({
            requestStatus: 'error',
            error: getErrorMessage(error),
          });
        }
      };

      return {
        issues: [],
        requestStatus: 'idle',
        error: null,

        loadIssues: async () => {
          const { requestStatus } = get();

          /*
           * Не отправляем повторный запрос:
           * - при повторном effect в StrictMode;
           * - если список уже загружен.
           */
          if (requestStatus !== 'idle') {
            return;
          }

          await fetchIssues();
        },

        reloadIssues: fetchIssues,
      };
    },
  );
};
