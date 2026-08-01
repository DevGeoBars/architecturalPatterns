import type { NavigateFunction } from "react-router-dom";

import type { SidebarItem } from "@/shared/ui/SideBar";
import type { INavigationItem } from "../model/navigation";


export const adaptNavigationToSideBarItems = (
  items: INavigationItem[],
  navigate:  NavigateFunction,
): SidebarItem[] => {
  return items.map((item) => ({
    id: item.path,
    title: item.text,
    icon: item.icon,
    path: item.path,
    position: 'top',
    onClick: () => {
      navigate(item.path);
    }
  }));
};
