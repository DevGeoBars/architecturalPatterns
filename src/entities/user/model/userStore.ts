import { create } from 'zustand';

import type { UserDto } from '@/shared/api/endpoints/user';

import {
  getCurrentUser,
  getSubUsers,
} from '../api/userApi';

import { normalizeSubUsers } from '../lib/normalizeSubUsers';
import { User } from './user';

interface UserState {
  currentUser: User | null;
  subUsers: User[];

  usersWithoutCompany: UserDto[];
  usersWithoutEmail: UserDto[];

  isCurrentUserLoading: boolean;
  isSubUsersLoading: boolean;

  currentUserError: string | null;
  subUsersError: string | null;

  loadCurrentUser: () => Promise<void>;
  loadSubUsers: (userId: number) => Promise<void>;

  clearCurrentUser: () => void;
  clearSubUsers: () => void;
}

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string =>
  error instanceof Error
    ? error.message
    : fallback;

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  subUsers: [],

  usersWithoutCompany: [],
  usersWithoutEmail: [],

  isCurrentUserLoading: false,
  isSubUsersLoading: false,

  currentUserError: null,
  subUsersError: null,

  loadCurrentUser: async () => {
    set({
      isCurrentUserLoading: true,
      currentUserError: null,
    });

    try {
      const dto = await getCurrentUser();

      set({
        currentUser: new User(dto),
        isCurrentUserLoading: false,
      });
    } catch (error) {
      set({
        currentUser: null,
        isCurrentUserLoading: false,
        currentUserError: getErrorMessage(
          error,
          'Не удалось загрузить пользователя',
        ),
      });

      throw error;
    }
  },

  loadSubUsers: async (userId) => {
    set({
      isSubUsersLoading: true,
      subUsersError: null,
    });

    try {
      const response = await getSubUsers(userId);
      const result = normalizeSubUsers(response.Users);

      set({
        subUsers: result.users,
        usersWithoutCompany:
        result.usersWithoutCompany,
        usersWithoutEmail:
        result.usersWithoutEmail,
        isSubUsersLoading: false,
      });
    } catch (error) {
      set({
        subUsers: [],
        usersWithoutCompany: [],
        usersWithoutEmail: [],
        isSubUsersLoading: false,
        subUsersError: getErrorMessage(
          error,
          'Не удалось загрузить пользователей',
        ),
      });

      throw error;
    }
  },

  clearCurrentUser: () => {
    set({
      currentUser: null,
      currentUserError: null,
    });
  },

  clearSubUsers: () => {
    set({
      subUsers: [],
      usersWithoutCompany: [],
      usersWithoutEmail: [],
      subUsersError: null,
    });
  },
}));
