import { USER_ROLES, type TUserRole } from '../../../model/user';
import type { UserRoleDto } from '../dto';

export const adaptUserRoleDto = (role: UserRoleDto): TUserRole => {
  return USER_ROLES[role];
};
