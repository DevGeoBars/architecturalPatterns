import type { BarItemType } from "@/shared/ui/BarItem";
import type { INavigationItem } from "@/widgets/main-layout/model/navigation";

export const adaptNavigationToSideBarItems = (
  items: INavigationItem[],
  position: 'top' | 'bottom' = 'top'
): BarItemType[] => {
  return items.map((item) => ({
    id: item.path || item.text,
    title: item.text,
    icon: item.icon,
    path: item.path,
    position,
  }));
};