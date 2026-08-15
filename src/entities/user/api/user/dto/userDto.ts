import type { ClaimsActivityDto } from './claimsActivityDto';
import type { CompanyDto } from './companyDto';
import type { TFLEXUserDto } from './tflexUserDto';
import type { UserRoleDto } from './userRoleDto';

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
