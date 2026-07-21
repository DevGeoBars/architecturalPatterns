import type { NavigateFunction } from "react-router-dom";

import type { BarItemType } from "@/shared/ui/SideBar/BarItem";
import type { INavigationItem } from "@/widgets/navigation-bar/model/navigation";


export const adaptNavigationToSideBarItems = (
  items: INavigationItem[],
  navigate:  NavigateFunction,
): BarItemType[] => {
  return items.map((item) => ({
    id: item.path || item.text,
    title: item.text,
    icon: item.icon,
    path: item.path,
    position: 'top',
    onClick: () => {
      navigate(item.path);
      debugger
    }
  }));
};