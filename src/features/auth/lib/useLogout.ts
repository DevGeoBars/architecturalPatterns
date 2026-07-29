import {
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  useUserStore,
} from '@/entities/user';

import {
  APP_ROUTES,
} from '@/shared/routes';

import {
  logout,
} from '../api/logout';

interface IUseLogoutResult {
  logoutUser: () => Promise<void>;
  isLogoutPending: boolean;
  logoutError: string | null;
}

export const useLogout =
  (): IUseLogoutResult => {
    const navigate = useNavigate();

    const clearCurrentUser =
      useUserStore(
        (state) =>
          state.clearCurrentUser,
      );

    const [
      isLogoutPending,
      setIsLogoutPending,
    ] = useState(false);

    const [
      logoutError,
      setLogoutError,
    ] = useState<string | null>(
      null,
    );

    const logoutUser =
      async (): Promise<void> => {
        if (isLogoutPending) {
          return;
        }

        setIsLogoutPending(true);
        setLogoutError(null);

        try {
          await logout();

          clearCurrentUser();

          navigate(
            APP_ROUTES.LOGIN,
            {
              replace: true,
            },
          );
        } catch (error: unknown) {
          setLogoutError(
            error instanceof Error
              ? error.message
              : 'Не удалось выполнить выход',
          );
        } finally {
          setIsLogoutPending(false);
        }
      };

    return {
      logoutUser,
      isLogoutPending,
      logoutError,
    };
  };
