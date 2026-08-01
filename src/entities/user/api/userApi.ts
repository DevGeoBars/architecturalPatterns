import type {
  UserDto,
  UsersListDto,
} from './dto';

export const getCurrentUser =
  async (): Promise<UserDto | null> => {
    const response = await fetch(
      '/api/users/current',
      {
        credentials: 'include',
      },
    );

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        'Не удалось проверить авторизацию',
      );
    }

    return response.json() as Promise<UserDto>;
  };

export const getSubUsers = async (
  userId: string,
): Promise<UsersListDto> => {
  const response = await fetch(
    `/api/users/${userId}/sub-users`,
    {
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Не удалось загрузить пользователей');
  }

  return response.json() as Promise<UsersListDto>;
};

export const getUserLabels = async (): Promise<string[]> => {
  const response = await fetch('/api/users/labels', {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось загрузить метки пользователей');
  }

  return response.json() as Promise<string[]>;
};
