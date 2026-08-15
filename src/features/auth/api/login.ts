import {
  parseUser,
  type User,
} from '@/entities/user';
import type { IHttpApiClient } from '@/shared/api/httpClient';

import type {
  ILoginCredentials,
} from '../model/loginCredentials';

export const login = async (
  httpApiClient: IHttpApiClient,
  credentials: ILoginCredentials,
): Promise<User> => {
  const response = await httpApiClient.post(
    '/api/auth/login',
    credentials,
  );
  return parseUser(response);
};
