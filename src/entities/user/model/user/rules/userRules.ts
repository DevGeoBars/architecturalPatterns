import type { UserData } from '../types/user';
import { USER_ROLES } from '../types/userRole';

export const isUserAdmin = (
  user: Pick<UserData, 'role'>,
): boolean => {
  return user.role === USER_ROLES.Administrator;
};
