import {
  create,
} from 'zustand';

import {
  getCurrentUser,
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
};

export const useAuthStore =
  create<IAuthState>(
    (set, get) => ({
      status: 'unknown',
      error: null,

      checkAuth: async (httpApiClient) => {
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
            await getCurrentUser(httpApiClient);

          if (userDto === null) {
            clearUserState();

            set({
              status:
                'unauthenticated',
              error: null,
            });

            return;
          }

          useUserStore
            .getState()
            .setCurrentUser(userDto);

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
