import type { IHttpApiClient } from '@/shared/api/httpClient';

import { HttpClientError } from '@/shared/api/httpClient';

import { User } from '../model/user';
import type { UserDto } from './dto';

const USER_ROLES = ['User', 'Customer', 'Partner', 'Administrator', 'Reader'] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isCompanyDto = (value: unknown): boolean =>
  isRecord(value) && typeof value.Id === 'number' &&
  typeof value.Guid === 'string' && typeof value.Name === 'string';

const isTflexUserDto = (value: unknown): boolean =>
  isRecord(value) && typeof value.Id === 'string' &&
  typeof value.Guid === 'string' && typeof value.Name === 'string';

const isUserRoleDto = (value: unknown): boolean =>
  typeof value === 'string' && USER_ROLES.some((role) => role === value);

export const isUserDto = (value: unknown): value is UserDto => {
  return isRecord(value) && typeof value.Id === 'string' &&
    typeof value.Guid === 'string' && typeof value.Name === 'string' &&
    typeof value.Email === 'string' && typeof value.IsExternal === 'boolean' &&
    isCompanyDto(value.Company) &&
    (value.TFLEXUser === undefined || isTflexUserDto(value.TFLEXUser)) &&
    isUserRoleDto(value.Role) && typeof value.UsersLimit === 'number' &&
    typeof value.Administrator === 'string' &&
    (value.ClaimsActivity === 0 || value.ClaimsActivity === 1) &&
    typeof value.IsForApproveAction === 'boolean';
};

export const parseUser = (value: unknown): User => {
  if (!isUserDto(value)) {
    throw new Error('Сервер вернул некорректные данные пользователя');
  }

  return new User(value);
};

export const getCurrentUser = async (
  httpApiClient: IHttpApiClient,
): Promise<User | null> => {
  try {
    return parseUser(await httpApiClient.get('/api/users/current'));
  } catch (error) {
    if (error instanceof HttpClientError && error.status === 401) {
      return null;
    }

    throw error;
  }
};
