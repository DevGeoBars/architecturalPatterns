import {
  create,
} from 'zustand';

import {
  getCurrentUser,
  User,
  useUserStore,
} from '@/entities/user';

import type {
  IAuthState,
} from './authState';

const getErrorMessage = (
  error: unknown,
): string => {
  return error instanceof Error
    ? error.message
    : 'Не удалось проверить авторизацию';
};

const clearUserState = (): void => {
  const userStore =
    useUserStore.getState();

  userStore.clearCurrentUser();
  userStore.clearSubUsers();
};

export const useAuthStore =
  create<IAuthState>(
    (set, get) => ({
      status: 'unknown',
      error: null,

      checkAuth: async () => {
        const { status } = get();

        if (
          status === 'checking' ||
          status === 'authenticated' ||
          status === 'unauthenticated'
        ) {
          return;
        }

        set({
          status: 'checking',
          error: null,
        });

        try {
          const userDto =
            await getCurrentUser();

          if (userDto === null) {
            clearUserState();

            set({
              status:
                'unauthenticated',
              error: null,
            });

            return;
          }

          const user =
            new User(userDto);

          useUserStore
            .getState()
            .setCurrentUser(user);

          set({
            status: 'authenticated',
            error: null,
          });
        } catch (error) {
          set({
            status: 'error',
            error:
              getErrorMessage(error),
          });
        }
      },

      setAuthenticated: (
        user,
      ) => {
        useUserStore
          .getState()
          .setCurrentUser(user);

        set({
          status: 'authenticated',
          error: null,
        });
      },

      setUnauthenticated: () => {
        clearUserState();

        set({
          status: 'unauthenticated',
          error: null,
        });
      },
    }),
  );
