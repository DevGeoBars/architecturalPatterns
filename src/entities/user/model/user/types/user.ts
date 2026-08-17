import type { Company } from './company';
import type { TFLEXUser } from './tflexUser';
import type { TUserActivity } from './userActivity';
import type { TUserRole } from './userRole';

import { isUserAdmin } from '../rules/userRules';

export interface UserData {
  id: string;
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
}

export class User implements UserData {
  id: string;
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

  constructor(data: UserData) {
    this.id = data.id;
    this.guid = data.guid;
    this.name = data.name;
    this.email = data.email;
    this.isExternal = data.isExternal;
    this.company = data.company;
    this.tflexUser = data.tflexUser;
    this.role = data.role;
    this.usersLimit = data.usersLimit;
    this.administrator = data.administrator;
    this.claimsActivity = data.claimsActivity;
    this.isForApproveAction = data.isForApproveAction;
  }

  isAdmin(): boolean {
    return isUserAdmin(this);
  }
}
