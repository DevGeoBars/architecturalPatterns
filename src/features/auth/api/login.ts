import {
  User,
  type UserDto,
} from '@/entities/user';

import type {
  ILoginCredentials,
} from '../model/loginCredentials';

interface ILoginErrorResponse {
  message?: string;
}

export const login = async (
  credentials: ILoginCredentials,
): Promise<User> => {
  const response = await fetch(
    '/api/auth/login',
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',
      },

      credentials: 'include',

      body: JSON.stringify(
        credentials,
      ),
    },
  );

  if (!response.ok) {
    const errorResponse =
      (await response
        .json()
        .catch(() => null)) as
        | ILoginErrorResponse
        | null;

    throw new Error(
      errorResponse?.message ??
      'Не удалось выполнить вход',
    );
  }

  const userDto =
    (await response.json()) as UserDto;

  return new User(userDto);
};
