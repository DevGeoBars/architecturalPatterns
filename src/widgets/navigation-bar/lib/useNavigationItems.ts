import { useMemo } from 'react';

import {
  USER_ROLES,
  type User,
} from '@/entities/user';

import {
  NAVIGATION_CONFIG,
} from '../config/navigationConfig';

import type {
  INavigationItem,
} from '../model/navigation';

export const useNavigationItems = (
  user: User | null,
): INavigationItem[] => {
  return useMemo(() => {
    if (user === null) {
      return [];
    }

    return user.role === USER_ROLES.Customer
      ? NAVIGATION_CONFIG.customer
      : NAVIGATION_CONFIG.nonCustomer;
  }, [user]);
};