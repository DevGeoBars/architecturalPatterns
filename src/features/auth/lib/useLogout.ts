import {
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  APP_ROUTES,
} from '@/shared/routes';
import { HTTP_API_CLIENT_TOKEN, type IHttpApiClient } from '@/shared/api';
import { useService } from '@/shared/di';

import {
  logout,
} from '../api/logout';

import {
  useAuthStore,
} from '../model/authStore';

interface IUseLogoutResult {
  logoutUser: () => Promise<void>;
  isLogoutPending: boolean;
  logoutError: string | null;
}

export const useLogout =
  (): IUseLogoutResult => {
    const navigate = useNavigate();
    const httpApiClient = useService<IHttpApiClient>(HTTP_API_CLIENT_TOKEN);

    const setUnauthenticated =
      useAuthStore(
        (state) =>
          state.setUnauthenticated,
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
          await logout(httpApiClient);

          setUnauthenticated();

          navigate(
            APP_ROUTES.LOGIN,
            {
              replace: true,
            },
          );
        } catch (error) {
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
