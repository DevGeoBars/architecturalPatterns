import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/routes';

export const AppRouter = () => {
  // Здесь можно разместить логику аналитики, обработки ошибок и т.п.
  return <RouterProvider router={router} />;
};
