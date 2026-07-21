import type {
  UserDto,
} from '../api/dto/userDto';
import { type Company, mapCompany } from "../api/mapCompany";

import { mapUserRole, type TUserRole, USER_ROLES } from "@/entities/user/api/mapUserRole";
import { mapClaimsActivity, type TUserActivity } from "@/entities/user/api/mapClaimsActivity";
import { mapTFlexUser, type TFLEXUser } from "@/entities/user/api/mapTFlexUser";


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
