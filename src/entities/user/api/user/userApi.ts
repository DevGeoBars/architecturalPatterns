import { HttpClientError, type IHttpApiClient } from '@/shared/api';

import type { User } from '../../model/user';
import type { UserDto } from './dto';
import { adaptUserDto } from './mapper/adaptUserDto';

export const parseUser = (dto: UserDto): User => {
  return adaptUserDto(dto);
};

export const getCurrentUser = async (
  httpApiClient: IHttpApiClient,
): Promise<User | null> => {
  try {
    const dto = await httpApiClient.get<UserDto>('/api/users/current');

    return dto === null ? null : parseUser(dto);
  } catch (error) {
    if (error instanceof HttpClientError && error.status === 401) {
      return null;
    }

    throw error;
  }
};
