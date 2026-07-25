import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/features/auth';
import { APP_ROUTES } from '@/shared/routes';
import { lazyPage } from '@/shared/lib/lazy-loading';

import { MainLayout } from '../ui/MainLayout';



// Ленивая загрузка страниц
const LoginPage = lazyPage(() => import('@/pages/auth'), 'LoginPage');
const HomePage = lazyPage(() => import('@/pages/home'), 'HomePage');
const ClaimsPage = lazyPage(() => import('@/pages/claims'), 'ClaimsPage');
const AddIssuePage = lazyPage(() => import('@/pages/add-issue'), 'AddIssuePage');
const IssuePage = lazyPage(() => import('@/pages/issue'), 'IssuePage');
const IssuesPage = lazyPage(() => import('@/pages/issue'), 'IssuesPage');

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
                        path: APP_ROUTES.CLAIMS,
                        element: <ClaimsPage />,
                    },
                    {
                        path: APP_ROUTES.ISSUE_EDIT,
                        element: <AddIssuePage />,
                    },
                    {
                        path: APP_ROUTES.ISSUE_DETAIL,
                        element: <IssuePage />,
                    },
                    {
                        path: APP_ROUTES.ISSUE_NEW,
                        element: <AddIssuePage />,
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
