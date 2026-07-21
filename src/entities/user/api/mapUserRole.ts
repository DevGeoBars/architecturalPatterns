import type { UserRoleDto } from "@/entities/user/api/dto/userRoleDto";

export const USER_ROLES = {
  User: 'Пользователь',
  Customer: 'Представитель заказчика',
  Partner: 'Представитель партнера',
  Administrator: 'Администратор',
  Reader: 'Только просмотр',
} as const satisfies Record<UserRoleDto, string>;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

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
