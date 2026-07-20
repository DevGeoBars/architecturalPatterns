import type {
  UserRoleDto,
} from '@/shared/api/endpoints/user';

import {
  USER_ROLES,
  type TUserRole,
} from '../model/userRole';

export const mapUserRole = (
  role: UserRoleDto,
): TUserRole => {
  const userRole = USER_ROLES[role];

  if (!userRole) {
    throw new Error(
      `Неизвестная роль пользователя: ${role}`,
    );
  }

  return userRole;
};
