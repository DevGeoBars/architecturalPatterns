import { Navigate } from 'react-router-dom';

import { USER_ROLES, useUserStore } from '@/entities/user';

import { APP_ROUTES } from '@/shared/routes';

import './HomePage.scss';

export const HomePage = () => {
  const currentUser = useUserStore((state) => state.currentUser);

  if (currentUser === null) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  const redirectRoute =
    currentUser.role === USER_ROLES.Customer
      ? APP_ROUTES.CLAIMS
      : APP_ROUTES.ISSUES;

  return <Navigate to={redirectRoute} replace />;
};