import {
    createBrowserRouter,
    Navigate,
} from 'react-router-dom';

import {
    ProtectedRoute,
} from '@/features/auth';

import {
    lazyPage,
} from '@/shared/lib/lazy-loading';

import {
    APP_ROUTES,
} from '@/shared/routes';

import {
    MainLayout,
} from '../ui/MainLayout';
import { CUSTOMER_ROUTE_ROLES, NON_CUSTOMER_ROUTE_ROLES } from "./config/routeAccess";

const LoginPage = lazyPage(
  () => import('@/pages/auth'),
  'LoginPage',
);

const HomePage = lazyPage(
  () => import('@/pages/home'),
  'HomePage',
);

const ClaimsPage = lazyPage(
  () => import('@/pages/claims'),
  'ClaimsPage',
);

const AddIssuePage = lazyPage(
  () => import('@/pages/add-issue'),
  'AddIssuePage',
);

const IssuePage = lazyPage(
  () => import('@/pages/issue'),
  'IssuePage',
);

const IssuesPage = lazyPage(
  () => import('@/pages/issues'),
  'IssuesPage',
);

const ActionsPage = lazyPage(
  () => import('@/pages/actions'),
  'ActionsPage',
);
export const router = createBrowserRouter([
    {
        path: APP_ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        element: (
                          <ProtectedRoute
                            allowedRoles={CUSTOMER_ROUTE_ROLES}
                            fallback={<Navigate to={APP_ROUTES.HOME} replace />}
                          />
                        ),
                        children: [
                            {
                                path: APP_ROUTES.CLAIMS,
                                element: <ClaimsPage />,
                            },
                        ],
                    },
                    {
                        element: (
                          <ProtectedRoute
                            allowedRoles={NON_CUSTOMER_ROUTE_ROLES}
                            fallback={<Navigate to={APP_ROUTES.HOME} replace />}
                          />
                        ),
                        children: [
                            {
                                index: true,
                                element: <Navigate to={APP_ROUTES.HOME} replace />,
                            },
                            {
                                path: APP_ROUTES.HOME,
                                element: <HomePage />,
                            },
                            {
                                path: APP_ROUTES.ISSUES,
                                element: <IssuesPage />,
                            },
                            {
                                path: APP_ROUTES.ACTIONS,
                                element: <ActionsPage />,
                            },
                            {
                                path: APP_ROUTES.ISSUE_NEW,
                                element: <AddIssuePage />,
                            },
                            {
                                path: APP_ROUTES.ISSUE_DETAIL,
                                element: <IssuePage />,
                            },
                            {
                                path: APP_ROUTES.ISSUE_EDIT,
                                element: <IssuePage />,
                            },
                        ],
                    },
                    {
                        path: '*',
                        element: <Navigate to={APP_ROUTES.HOME} replace />,
                    },
                ],
            },
        ],
    },
]);