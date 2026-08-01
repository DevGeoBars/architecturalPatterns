import type {
  User,
} from '@/entities/user';

import type {
  TAuthStatus,
} from './authStatus';

export interface IAuthState {
  status: TAuthStatus;
  error: string | null;

  checkAuth: () => Promise<void>;

  setAuthenticated: (
    user: User,
  ) => void;

  setUnauthenticated: () => void;
}
