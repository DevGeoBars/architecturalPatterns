import {
  Outlet,
} from 'react-router-dom';

import {
  NavigationBar,
} from '@/widgets/navigation-bar';

import {
  UserProfileWidget,
} from '@/widgets/user-profile';

import './MainLayout.scss';

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <UserProfileWidget />
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
