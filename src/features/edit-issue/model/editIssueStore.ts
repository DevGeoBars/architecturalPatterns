import {
  createStore,

  type StoreApi,
} from 'zustand/vanilla';

import type {
  IIssueApi,

  Issue,
} from '@/entities/issue';

import {
  createEditIssueInitialData,
} from '../config/createEditIssueInitialData';

import {
  prepareEditIssueData,
} from './transformers/prepareEditIssueData';

import {
  validateEditIssueData,
} from './validateEditIssueData';

import type {
  IEditIssueState,
} from './editIssueState';

export type TEditIssueStore =
  StoreApi<IEditIssueState>;

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof Error
    ? error.message
    : 'Не удалось сохранить обращение';
};

export const createEditIssueStore = (
  issueApi: IIssueApi,

  issue: Issue,
): TEditIssueStore => {
  return createStore<IEditIssueState>(
    (set, get) => ({
      formData:
        createEditIssueInitialData(
          issue,
        ),

      requestStatus: 'idle',

      error: null,

      updateField: (
        field,

        value,
      ) => {
        if (
          get().requestStatus ===
          'loading'
        ) {
          return;
        }

        set((state) => ({
          formData: {
            ...state.formData,

            [field]: value,
          },

          requestStatus: 'idle',

          error: null,
        }));
      },

      submit: async () => {
        if (
          get().requestStatus ===
          'loading'
        ) {
          return null;
        }

        const preparedData =
          prepareEditIssueData(
            get().formData,
          );

        const validationError =
          validateEditIssueData(
            preparedData,
          );

        if (
          validationError !==
          null
        ) {
          set({
            requestStatus:
              'error',

            error:
            validationError,
          });

          return null;
        }

        set({
          requestStatus:
            'loading',

          error: null,
        });

        try {
          const updatedIssue =
            await issueApi.updateIssue(
              issue.id,

              preparedData,
            );

          set({
            formData:
              createEditIssueInitialData(
                updatedIssue,
              ),

            requestStatus:
              'success',

            error: null,
          });

          return updatedIssue;
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

          return null;
        }
      },
    }),
  );
};
