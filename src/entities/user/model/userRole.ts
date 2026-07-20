import type { UserRoleDto } from "@/shared/api/endpoints/user";

export const USER_ROLES = {
  User: 'Пользователь',
  Customer: 'Представитель заказчика',
  Partner: 'Представитель партнера',
  Administrator: 'Администратор',
  Reader: 'Только просмотр',
} as const satisfies Record<UserRoleDto, string>;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
