import { isNotNullish } from '@/shared/lib/typeGuards';

import type { UserDto } from "../api/dto";
import { User } from '../model/user';


export interface NormalizeSubUsersResult {
  users: User[];
  usersWithoutCompany: UserDto[];
  usersWithoutEmail: UserDto[];
}

export const normalizeSubUsers = (
  usersDto: UserDto[],
): NormalizeSubUsersResult => {
  const usersWithoutCompany = usersDto.filter(
    (dto) => !isNotNullish(dto.Company),
  );

  const usersWithoutEmail = usersDto.filter(
    (dto) => !dto.Email,
  );

  const users = usersDto
    .filter((dto) => isNotNullish(dto.Company))
    .map((dto) => new User(dto));

  return {
    users,
    usersWithoutCompany,
    usersWithoutEmail,
  };
};
