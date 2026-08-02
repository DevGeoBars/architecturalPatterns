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

export interface IIssuesState {
  issues: Issue[];
  requestStatus: TIssuesListRequestStatus;
  error: string | null;

  loadIssues: () => Promise<void>;
  reloadIssues: () => Promise<void>;
  addIssue: (issue: Issue) => void;
}

export type TIssuesStore =
  StoreApi<IIssuesState>;

const getErrorMessage = (
  error: unknown,
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить заявки';
};

export const createIssuesStore = (
  issueApi: IIssueApi,
): TIssuesStore => {
  return createStore<IIssuesState>(
    (set, get) => {
      const fetchIssues =
        async (): Promise<void> => {
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
              error: null,
            });
          } catch (error: unknown) {
            set({
              requestStatus: 'error',

              error:
                getErrorMessage(
                  error,
                ),
            });
          }
        };

      return {
        issues: [],

        requestStatus: 'idle',

        error: null,

        loadIssues: async () => {
          const {
            requestStatus,
          } = get();

          if (
            requestStatus !== 'idle'
          ) {
            return;
          }

          await fetchIssues();
        },

        reloadIssues: fetchIssues,

        addIssue: (issue) => {
          const issueExists =
            get().issues.some(
              (currentIssue) =>
                currentIssue.id ===
                issue.id,
            );

          if (issueExists) {
            return;
          }

          set((state) => ({
            issues: [
              ...state.issues,
              issue,
            ],

            requestStatus: 'success',

            error: null,
          }));
        },
      };
    },
  );
};
