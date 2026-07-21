import { Navigate, Outlet } from 'react-router-dom';

import { APP_ROUTES } from '@/shared/routes';
import { NavigationBar } from '@/widgets/navigation-bar';


export const MainLayout = () => {

  const authStore = {
    User: {
      Role: 'Представитель партнера',
      ClaimsActivity: 'Seller'
    }
  };

  if (!authStore.User) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return (
    <div className="app-layout">
      <header className="app-header">

        {/* скорее всего тоже в виджет */}
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <NavigationBar />
        </aside>

        <main className="app-content">
          <Outlet />
        </main>
      </div>

      <footer className="app-footer">
        (С) 2026
        {/* скорее всего тоже в виджет */}
      </footer>
    </div>
  );
};