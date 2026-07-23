// entities/issue/model/issueStore.ts

import { create } from 'zustand';

import type {
  IIssueApi,
} from '../api';
import type { Issue } from './issue';

interface IssueState {
  issues: Issue[];
  isLoading: boolean;
  error: string | null;

  loadIssues(): Promise<void>;
}

export const createIssueStore = (
  issueApi: IIssueApi,
) => {
  return create<IssueState>((set) => ({
    issues: [],
    isLoading: false,
    error: null,

    loadIssues: async () => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const issues =
          await issueApi.getIssues();

        set({
          issues,
          isLoading: false,
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Не удалось загрузить заявки',
        });
      }
    },
  }));
};
