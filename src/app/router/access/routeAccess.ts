import { USER_ROLES, type TUserRole } from '@/entities/user';

export const CUSTOMER_ROUTE_ROLES = [
  USER_ROLES.Customer,
] as const satisfies readonly TUserRole[];

export const NON_CUSTOMER_ROUTE_ROLES = [
  USER_ROLES.User,
  USER_ROLES.Partner,
  USER_ROLES.Administrator,
  USER_ROLES.Reader,
] as const satisfies readonly TUserRole[];
