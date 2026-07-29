import { useNavigate } from 'react-router-dom';

import { useUserStore } from '@/entities/user';

import { SideBar } from "@/shared/ui/SideBar";

import { adaptNavigationToSideBarItems } from "../lib/adaptNavigationToSideBarItems";
import { useNavigationItems } from "../lib/useNavigationItems";

import LOGO from "@/shared/assets/icons/major/Logotype.svg";


export const NavigationBar = () => {
  const navigate = useNavigate();

  const currentUser = useUserStore(
    (state) => state.currentUser,
  );

  const navigationItems = useNavigationItems(currentUser);

  const sideBarItems = adaptNavigationToSideBarItems(
    navigationItems,
    navigate,
  );

  if (!currentUser) {
    return null;
  }

  const title =
    currentUser.role === 'Представитель партнера' &&
    currentUser.claimsActivity === 'Seller'
      ? 'title for sellers'
      : 'default title';

  return (
    <SideBar
      minWidth={40}
      items={sideBarItems}
      title={title}
      logoSrc={LOGO}
    />
  );
};
