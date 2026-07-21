import type { CompanyDto } from "./companyDto";
import type { UserRoleDto } from "./userRoleDto";
import type { TFLEXUserDto } from "./tflexUserDto";
import type { ClaimsActivityDto } from "./claimsActivity";

export interface UserDto {
  Id: string;
  Guid: string;
  Name: string;
  Email: string;
  IsExternal: boolean;
  Company: CompanyDto;
  TFLEXUser?: TFLEXUserDto;
  Role: UserRoleDto;
  UsersLimit: number;
  Administrator: string;
  ClaimsActivity: ClaimsActivityDto;
  IsForApproveAction: boolean;
}

export interface UsersListDto {
  Users: UserDto[];
}
