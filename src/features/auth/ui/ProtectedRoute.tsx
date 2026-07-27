import type {
  ReactNode,
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

interface IProtectedRouteProps {
  allowedRoles?: TUserRole[];
  redirectTo?: string;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo =
  APP_ROUTES.LOGIN,
  fallback = null,
}: IProtectedRouteProps) => {
  const currentUser =
    useUserStore(
      (state) =>
        state.currentUser,
    );

  if (!currentUser) {
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
