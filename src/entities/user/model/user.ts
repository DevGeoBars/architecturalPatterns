import type {
  UserDto,
} from '@/shared/api/endpoints/user';

import {
  getUserActivity,
} from '../lib/getUserActivity';
import {
  mapUserRole,
} from '../lib/mapUserRole';

import { Company } from './company';
import { TFLEXUser } from './tflexUser';
import type {
  TUserActivity, TUserActivityCode,
} from './userActivity';
import {
  USER_ROLES,
  type TUserRole,
} from './userRole';

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
    this.claimsActivity =
      getUserActivity(dto.ClaimsActivity as TUserActivityCode);
    this.isForApproveAction =
      dto.IsForApproveAction;
  }

  isAdmin(): boolean {
    return this.role === USER_ROLES.Administrator;
  }
}
