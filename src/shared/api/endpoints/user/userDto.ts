import type { CompanyDto } from '../company';
import type { TFLEXUserDto } from './tflexUserDto';
import type { TUserDtoRole } from "./userRoleDto";

export interface UserDto {
  Id: string;
  Guid: string;
  Name: string;
  Email: string;
  IsExternal: boolean;
  Company: CompanyDto;
  TFLEXUser?: TFLEXUserDto;
  Role: TUserDtoRole;
  UsersLimit: number;
  Administrator: string;
  ClaimsActivity: number;
  IsForApproveAction: boolean;
}

export interface UsersListDto {
  Users: UserDto[];
}
