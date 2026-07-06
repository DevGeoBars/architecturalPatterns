import { useMemo } from 'react';

import { NAVIGATION_CONFIG } from '../config/navigationConfig';
import type { INavigationItem } from '../model/navigation';

export const useNavigationItems = (user: any): INavigationItem[] => {

  return useMemo(() => {
    if (!user) return [];
    const isSeller = user.Role === 'Представитель партнера' && user.ClaimsActivity === 'Seller';
    if (isSeller) return NAVIGATION_CONFIG.seller;
    const isAdmin = user.Role === 'Admin' || user.Role === 'Модератор';
    if (isAdmin) return NAVIGATION_CONFIG.admin;
    return [];
  }, [user]);
};