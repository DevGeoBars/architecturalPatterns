import { HttpClientError, type IHttpApiClient } from '@/shared/api/httpClient';

import type { User } from '../../model/user';
import { isUserDto } from './lib/isUserDto';
import { adaptUserDto } from './mapper/adaptUserDto';

export const parseUser = (value: unknown): User => {
  if (!isUserDto(value)) {
    throw new Error('Сервер вернул некорректные данные пользователя');
  }

  return adaptUserDto(value);
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
