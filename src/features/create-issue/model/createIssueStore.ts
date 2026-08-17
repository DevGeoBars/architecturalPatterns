import {
  createStore,
  type StoreApi,
} from 'zustand/vanilla';

import type {
  IIssueApi,
} from '@/entities/issue';

import {
  createIssueInitialData,
} from '../config/createIssueInitialData';

import {
  prepareCreateIssueData,
} from './transformers/prepareCreateIssueData';

import {
  validateCreateIssueData,
} from './validateCreateIssueData';

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
      formData:
        createIssueInitialData(),

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

      resetForm: () => {
        if (
          get().requestStatus ===
          'loading'
        ) {
          return;
        }

        set({
          formData:
            createIssueInitialData(),

          requestStatus: 'idle',

          error: null,
        });
      },

      submit: async () => {
        if (
          get().requestStatus ===
          'loading'
        ) {
          return null;
        }

        const preparedData =
          prepareCreateIssueData(
            get().formData,
          );

        const validationError =
          validateCreateIssueData(
            preparedData,
          );

        if (
          validationError !== null
        ) {
          set({
            requestStatus: 'error',

            error:
            validationError,
          });

          return null;
        }

        set({
          requestStatus: 'loading',

          error: null,
        });

        try {
          const createdIssue =
            await issueApi.createIssue(
              preparedData,
            );

          set({
            formData:
              createIssueInitialData(),

            requestStatus:
              'success',

            error: null,
          });

          return createdIssue;
        } catch (error: unknown) {
          set({
            requestStatus: 'error',

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
