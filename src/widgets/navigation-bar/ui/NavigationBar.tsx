import { Navigate, useNavigate } from 'react-router-dom';


import { APP_ROUTES } from '@/shared/routes';
import { SideBar } from "@/shared/ui/SideBar";

import { adaptNavigationToSideBarItems } from "../lib/adaptNavigationToSideBarItems";
import { useNavigationItems } from "../lib/useNavigationItems";

import LOGO from "@/shared/assets/icons/major/Logotype.svg";


export const NavigationBar = () => {
  const navigate = useNavigate();

  const authStore = {
    User: {
      Role: 'Представитель партнера',
      ClaimsActivity: 'Seller'
    }
  };

  const navigationItems = useNavigationItems(authStore.User);
  const sideBarItems = adaptNavigationToSideBarItems(navigationItems, navigate);


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
      items={sideBarItems}
    >
      {title}
    </SideBar>
  );
};