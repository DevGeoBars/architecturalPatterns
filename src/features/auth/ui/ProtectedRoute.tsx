import { Navigate, Outlet } from 'react-router-dom';
// import { useUserStore } from '@/entities/user';
import { APP_ROUTES } from '@/shared/routes';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo = APP_ROUTES.LOGIN,
  fallback = null,
}: ProtectedRouteProps) => {
  //@ts-ignore todo@bars - реализовать
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to={redirectTo ?? APP_ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.Role)) {
    return fallback ? <>{fallback}</> : <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
