import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export const AppRouter = () => {
  // Здесь можно разместить логику аналитики, обработки ошибок и т.п.
  return <RouterProvider router={router} />;
};
