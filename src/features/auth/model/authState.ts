import type {
  User,
} from '@/entities/user';
import type { IHttpApiClient } from '@/shared/api/httpClient';

import type {
  TAuthStatus,
} from './authStatus';

export interface IAuthState {
  status: TAuthStatus;
  error: string | null;

  checkAuth: (httpApiClient: IHttpApiClient) => Promise<void>;

  setAuthenticated: (
    user: User,
  ) => void;

  setUnauthenticated: () => void;
}
