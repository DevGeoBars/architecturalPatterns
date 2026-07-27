import {
  createStore,
} from 'zustand/vanilla';

import type {
  User,
} from '@/entities/user';

import type {
  ILoginCredentials,
} from './loginCredentials';

interface ILoginDependencies {
  login(
    credentials: ILoginCredentials,
  ): Promise<User>;
}

export interface ILoginState {
  isPending: boolean;
  error: string | null;

  submit(
    credentials: ILoginCredentials,
  ): Promise<User | null>;

  clearError(): void;
}

export type TLoginStore =
  ReturnType<typeof createLoginStore>;

export const createLoginStore = (
  dependencies: ILoginDependencies,
) => {
  return createStore<ILoginState>()(
    (set) => ({
      isPending: false,
      error: null,

      submit: async (
        credentials,
      ) => {
        set({
          isPending: true,
          error: null,
        });

        try {
          return await dependencies.login(
            credentials,
          );
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Не удалось выполнить вход',
          });

          return null;
        } finally {
          set({
            isPending: false,
          });
        }
      },

      clearError: () => {
        set({
          error: null,
        });
      },
    }),
  );
};
