import { useMemo } from 'react';

import { NAVIGATION_CONFIG } from '../config/navigationConfig';
import type { INavigationItem } from '../model/navigation';
import type { User } from "@/entities/user";

export const useNavigationItems = (user: User | null): INavigationItem[] => {

  return useMemo(() => {
    if (!user) return [];
    const isSeller = user.role === 'Представитель партнера' && user.claimsActivity === 'Seller';
    if (isSeller) return NAVIGATION_CONFIG.seller;
    if (user.isAdmin()) return NAVIGATION_CONFIG.admin;
    return [];
  }, [user]);
};
