import {
  parseUser,
  type User,
  type UserDto,
} from '@/entities/user';
import type { IHttpApiClient } from '@/shared/api';

import type {
  ILoginCredentials,
} from '../model/loginCredentials';

export const login = async (
  httpApiClient: IHttpApiClient,
  credentials: ILoginCredentials,
): Promise<User> => {
  const response = await httpApiClient.post<UserDto>(
    '/api/auth/login',
    credentials,
  );

  if (response === null) {
    throw new Error('Сервер не вернул данные пользователя');
  }

  return parseUser(response);
};
