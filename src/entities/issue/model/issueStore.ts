import {
  createStore,
  type StoreApi,
} from 'zustand/vanilla';

import type { IIssueApi } from '../api';
import type { Issue } from './interface/issue';

export type TIssueRequestStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export interface IIssueState {
  currentIssue: Issue | null;
  requestStatus: TIssueRequestStatus;
  error: string | null;

  getCurrentIssue: (
    issueId: number,
  ) => Promise<void>;

  clearCurrentIssue: () => void;
}

export type TIssueStore =
  StoreApi<IIssueState>;

const getErrorMessage = (
  error: unknown,
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить обращение';
};

export const createIssueStore = (
  issueApi: IIssueApi,
): TIssueStore => {
  return createStore<IIssueState>((set) => ({
    currentIssue: null,
    requestStatus: 'idle',
    error: null,

    getCurrentIssue: async (
      issueId: number,
    ): Promise<void> => {
      set({
        requestStatus: 'loading',
        error: null,
      });

      try {
        const currentIssue =
          await issueApi.getIssue(issueId);

        set({
          currentIssue,
          requestStatus: 'success',
          error: null,
        });
      } catch (error: unknown) {
        set({
          currentIssue: null,
          requestStatus: 'error',
          error: getErrorMessage(error),
        });
      }
    },

    clearCurrentIssue: (): void => {
      set({
        currentIssue: null,
        requestStatus: 'idle',
        error: null,
      });
    },
  }));
};
