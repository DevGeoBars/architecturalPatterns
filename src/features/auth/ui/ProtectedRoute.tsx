import {
  useEffect,
  type ReactNode,
} from 'react';

import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import {
  useUserStore,
  type TUserRole,
} from '@/entities/user';

import {
  APP_ROUTES,
} from '@/shared/routes';
import { HTTP_API_CLIENT_TOKEN, type IHttpApiClient } from '@/shared/api';
import { useService } from '@/shared/lib/di';

import {
  useAuthStore,
} from '../model/authStore';

interface IProtectedRouteProps {
  allowedRoles?: readonly TUserRole[];

  redirectTo?: string;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo =
  APP_ROUTES.LOGIN,
  fallback = null,
  loadingFallback = null,
}: IProtectedRouteProps) => {
  const httpApiClient = useService<IHttpApiClient>(HTTP_API_CLIENT_TOKEN);
  const currentUser =
    useUserStore(
      (state) =>
        state.currentUser,
    );

  const status = useAuthStore((state) => state.status);
  const authError = useAuthStore((state) => state.error);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    if (status === 'unknown') {
      void checkAuth(httpApiClient);
    }
  }, [status, checkAuth, httpApiClient]);

  if (
    status === 'unknown' ||
    status === 'checking'
  ) {
    return loadingFallback ?? (
      <div>
        Проверяем данных пользователя...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>
          {authError ??
            'Не удалось проверить авторизацию'}
        </p>

        <button
          type="button"
          onClick={() => {
            void checkAuth(httpApiClient);
          }}
        >
          Повторить
        </button>
      </div>
    );
  }

  if (
    status ===
    'unauthenticated' ||
    currentUser === null
  ) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  const isAllowed =
    allowedRoles === undefined ||
    allowedRoles.includes(
      currentUser.role,
    );

  if (!isAllowed) {
    return fallback ?? (
      <Navigate
        to={APP_ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
};
