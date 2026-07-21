import type { UserRoleDto } from "./dto/userRoleDto";
import { type TUserRole, USER_ROLES } from "../model/userRole";


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
