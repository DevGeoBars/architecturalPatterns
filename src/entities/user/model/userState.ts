import type {
  UserDto,
} from '../api/dto';

import type {
  User,
} from './user';

export interface IUserState {
  currentUser: User | null;
  subUsers: User[];

  usersWithoutCompany: UserDto[];
  usersWithoutEmail: UserDto[];

  isSubUsersLoading: boolean;
  subUsersError: string | null;

  setCurrentUser: (
    user: User,
  ) => void;

  clearCurrentUser: () => void;

  loadSubUsers: (
    userId: string,
  ) => Promise<void>;

  clearSubUsers: () => void;
}
