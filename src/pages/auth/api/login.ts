import type {
  UserDto,
} from '@/entities/user/api/dto';

interface ILoginRequest {
  login: string;
  password: string;
}

interface IErrorResponse {
  message?: string;
}

export const login = async (
  credentials: ILoginRequest,
): Promise<UserDto> => {
  const response = await fetch(
    '/api/auth/login',
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify(
        credentials,
      ),
    },
  );

  if (!response.ok) {
    const errorData =
      (await response
        .json()
        .catch(() => null)) as
        | IErrorResponse
        | null;

    throw new Error(
      errorData?.message ??
      'Не удалось авторизоваться',
    );
  }

  return response.json() as Promise<UserDto>;
};
