import { User } from '../../../model/user';
import type { UserDto } from '../dto';
import { adaptCompanyDto } from './adaptCompanyDto';
import { adaptTFlexUserDto } from './adaptTFlexUserDto';
import { adaptUserActivityDto } from './adaptUserActivityDto';
import { adaptUserRoleDto } from './adaptUserRoleDto';

export const adaptUserDto = (dto: UserDto): User => {
  return new User({
    id: dto.Id,
    guid: dto.Guid,
    name: dto.Name,
    email: dto.Email,
    isExternal: dto.IsExternal,
    company: adaptCompanyDto(dto.Company),
    tflexUser: dto.TFLEXUser ? adaptTFlexUserDto(dto.TFLEXUser) : undefined,
    role: adaptUserRoleDto(dto.Role),
    usersLimit: dto.UsersLimit,
    administrator: dto.Administrator,
    claimsActivity: adaptUserActivityDto(dto.ClaimsActivity),
    isForApproveAction: dto.IsForApproveAction,
  });
};
