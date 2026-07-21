import type {
  UserDto,
} from '../api/dto/userDto';

import { mapCompany } from "../api/mapCompany";
import { mapUserRole } from "../api/mapUserRole";
import { mapClaimsActivity } from "../api/mapClaimsActivity";
import { mapTFlexUser } from "../api/mapTFlexUser"

import type { Company } from "./company";
import type { TFLEXUser } from "./tflexUser";
import { type TUserRole, USER_ROLES } from "./userRole";
import type { TUserActivity } from "./userActivity";


export class User {
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

  constructor(dto: UserDto) {
    this.id = dto.Id;
    this.guid = dto.Guid;
    this.name = dto.Name;
    this.email = dto.Email;
    this.isExternal = dto.IsExternal;
    this.company = mapCompany(dto.Company);

    this.tflexUser = dto.TFLEXUser
      ? mapTFlexUser(dto.TFLEXUser)
      : undefined;

    this.role = mapUserRole(dto.Role);
    this.usersLimit = dto.UsersLimit;
    this.administrator = dto.Administrator;
    this.claimsActivity = mapClaimsActivity(dto.ClaimsActivity);
    this.isForApproveAction =
      dto.IsForApproveAction;
  }

  isAdmin(): boolean {
    return this.role === USER_ROLES.Administrator;
  }
}
