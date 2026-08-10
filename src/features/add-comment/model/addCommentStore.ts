import {
  createStore,

  type StoreApi,
} from 'zustand/vanilla';

import type {
  CreateCommentData,
  IIssueApi,
} from '@/entities/issue';

import {
  createAddCommentInitialData,
} from '../config/createAddCommentInitialData';

import {
  prepareAddCommentData,
} from '../lib/prepareAddCommentData';

import {
  validateAddCommentData,
} from '../lib/validateAddCommentData';

import type {
  IAddCommentState,
} from './addCommentState';

export type TAddCommentStore =
  StoreApi<IAddCommentState>;

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof Error
    ? error.message
    : 'Не удалось добавить комментарий';
};

export const createAddCommentStore = (
  issueApi: IIssueApi,
): TAddCommentStore => {
  return createStore<IAddCommentState>(
    (
      set,

      get,
    ) => ({
      formData:
        createAddCommentInitialData(),

      requestStatus:
        'idle',

      error: null,

      setContent: (
        content,
      ) => {
        if (
          get()
            .requestStatus ===
          'loading'
        ) {
          return;
        }

        set({
          formData: {
            content,
          },

          requestStatus:
            'idle',

          error: null,
        });
      },

      resetForm: () => {
        if (
          get()
            .requestStatus ===
          'loading'
        ) {
          return;
        }

        set({
          formData:
            createAddCommentInitialData(),

          requestStatus:
            'idle',

          error: null,
        });
      },

      submit: async (
        issue,

        authorId,

        authorName,
      ) => {
        if (
          get()
            .requestStatus ===
          'loading'
        ) {
          return null;
        }

        const preparedData =
          prepareAddCommentData(
            get().formData,
          );

        const validationError =
          validateAddCommentData(
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

        const commentData:
          CreateCommentData = {
          content:
          preparedData.content,

          authorId,

          authorName,
        };

        set({
          requestStatus:
            'loading',

          error: null,
        });

        try {
          const updatedIssue =
            await issueApi.addComment(
              issue,

              commentData,
            );

          set({
            formData:
              createAddCommentInitialData(),

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
