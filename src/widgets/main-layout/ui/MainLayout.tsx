import { Outlet, Navigate } from 'react-router-dom';


import { APP_ROUTES } from '@/shared/routes';
import { SideBar } from "@/shared/ui/SideBar";
import { sideBarTools } from "@/widgets/main-layout/ui/__mock__/navBarItems";

import LOGO from "@/shared/assets/icons/major/Logotype.svg";

export const MainLayout = () => {
  const authStore = {
    User: {
      Role: 'Представитель партнера',
      ClaimsActivity: 'Seller'
    }
  };

  // const authStore = null

  // Защита маршрутов: если нет пользователя — редирект на логин
  if (!authStore.User) {
    return <Navigate to={APP_ROUTES.LOGIN} replace/>;
  }

  const title =
    authStore.User?.Role === 'Представитель партнера' &&
    authStore.User?.ClaimsActivity === 'Seller'
      ? 'title for sellers'
      : 'default title';

  return (
    <SideBar
      options={{
        minSize: 60,
        maxSize: 400,
        logoSrc: LOGO,
      }}
      title={title}
      items={sideBarTools}

    >
      <Outlet/>
    </SideBar>
  );
};