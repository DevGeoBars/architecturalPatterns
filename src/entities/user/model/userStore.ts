import {
  create,
} from 'zustand';

import {
  getSubUsers,
} from '../api/userApi';

import {
  normalizeSubUsers,
} from '../lib/normalizeSubUsers';

import type {
  IUserState,
} from './userState';

const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return error instanceof Error
    ? error.message
    : fallback;
};

export const useUserStore =
  create<IUserState>((set) => ({
    currentUser: null,
    subUsers: [],

    usersWithoutCompany: [],
    usersWithoutEmail: [],

    isSubUsersLoading: false,
    subUsersError: null,

    setCurrentUser: (user) => {
      set({
        currentUser: user,
      });
    },

    clearCurrentUser: () => {
      set({
        currentUser: null,
      });
    },

    loadSubUsers: async (
      userId,
    ) => {
      set({
        isSubUsersLoading: true,
        subUsersError: null,
      });

      try {
        const response =
          await getSubUsers(userId);

        const result =
          normalizeSubUsers(
            response.Users,
          );

        set({
          subUsers:
          result.users,

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

          subUsersError:
            getErrorMessage(
              error,
              'Не удалось загрузить пользователей',
            ),
        });

        throw error;
      }
    },

    clearSubUsers: () => {
      set({
        subUsers: [],
        usersWithoutCompany: [],
        usersWithoutEmail: [],
        subUsersError: null,
        isSubUsersLoading: false,
      });
    },
  }));
