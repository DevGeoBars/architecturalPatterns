// entities/user/model/user.ts

import type {
  TUserDtoRole,
  UserDto,
} from '@/shared/api/endpoints/user';

import { Company } from './company';
import { TFLEXUser } from './tflexUser';

const USER_ROLES = {
  User: 'Пользователь',
  Customer: 'Представитель заказчика',
  Partner: 'Представитель партнера',
  Administrator: 'Администратор',
  Reader: 'Только просмотр',
} as const satisfies Record<TUserDtoRole, string>;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type TUserActivity =
  | 'Seller'
  | 'TechnicalSpecialist';

const mapUserRole = (
  role: TUserDtoRole,
): TUserRole => USER_ROLES[role];

const mapUserActivity = (
  claimsActivity: number,
): TUserActivity =>
  claimsActivity === 0
    ? 'TechnicalSpecialist'
    : 'Seller';

export class User {
  id: number;
  guid: string;
  name: string;
  email: string;
  isExternal: boolean;
  company: Company;
  tflexUser?: TFLEXUser;
  role: TUserRole;
  usersLimit: number;
  administrator: string;
  claimsActivity: TUserActivity;
  isForApproveAction: boolean;

  constructor(dto: UserDto) {
    this.id = Number(dto.Id);
    this.guid = dto.Guid;
    this.name = dto.Name;
    this.email = dto.Email;
    this.isExternal = dto.IsExternal;
    this.company = new Company(dto.Company);
    this.tflexUser = dto.TFLEXUser
      ? new TFLEXUser(dto.TFLEXUser)
      : undefined;
    this.role = mapUserRole(dto.Role);
    this.usersLimit = dto.UsersLimit;
    this.administrator = dto.Administrator;
    this.claimsActivity = mapUserActivity(dto.ClaimsActivity);
    this.isForApproveAction = dto.IsForApproveAction;
  }

  isAdmin(): boolean {
    return this.role === USER_ROLES.Administrator;
  }
}
