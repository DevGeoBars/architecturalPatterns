import { createBrowserRouter, Navigate } from 'react-router-dom';

import { NavigationBar } from "@/widgets/navigation-bar";
import { APP_ROUTES } from '@/shared/routes';
import { lazyPage } from "@/shared/lib/lazy-loading";


// Ленивая загрузка страниц
const LoginPage = lazyPage(() => import('@/pages/auth'), 'LoginPage');
const HomePage = lazyPage(() => import('@/pages/home'), 'HomePage');
const IssuesPage = lazyPage(() => import('@/pages/issues'), 'IssuesPage');
const ClaimsPage = lazyPage(() => import('@/pages/claims'), 'ClaimsPage');
const AddIssuePage = lazyPage(() => import('@/pages/add-issue'), 'AddIssuePage');
const IssuePage = lazyPage(() => import('@/pages/issue'), 'IssuePage');

export const router = createBrowserRouter([
    // Публичный маршрут
    {
        path: APP_ROUTES.LOGIN,
        element: <LoginPage />,
    },
    // Защищённые маршруты с общим лейаутом
    {
        element: <NavigationBar />,
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
]);