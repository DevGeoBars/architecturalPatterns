import type {
  User,
} from './user';

export interface IUserState {
  currentUser: User | null;
  setCurrentUser: (
    user: User,
  ) => void;

  clearCurrentUser: () => void;

}
