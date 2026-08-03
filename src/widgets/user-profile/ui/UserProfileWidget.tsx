import {
  useState,
} from 'react';

import {
  UserCard,
  useUserStore,
} from '@/entities/user';

import {
  Dialog,
} from '@/shared/ui/Dialog';

import './UserProfileWidget.scss';

const getUserInitial = (
  name: string,
): string => {
  return (
    name
      .trim()
      .charAt(0)
      .toUpperCase() || '?'
  );
};

export const UserProfileWidget = () => {
  const currentUser =
    useUserStore(
      (state) =>
        state.currentUser,
    );

  const [
    isProfileDialogOpen,
    setIsProfileDialogOpen,
  ] = useState(false);

  if (currentUser === null) {
    return null;
  }

  const openProfileDialog =
    (): void => {
      setIsProfileDialogOpen(
        true,
      );
    };

  const closeProfileDialog =
    (): void => {
      setIsProfileDialogOpen(
        false,
      );
    };

  return (
    <div className="user-profile-widget">
      <button
        className={
          'user-profile-widget__trigger'
        }
        type="button"
        aria-label={
          'Открыть профиль пользователя'
        }
        title={currentUser.name}
        onClick={openProfileDialog}
      >
        <span aria-hidden="true">
          {getUserInitial(
            currentUser.name,
          )}
        </span>
      </button>

      <Dialog
        isOpen={
          isProfileDialogOpen
        }
        title="Профиль пользователя"
        onClose={
          closeProfileDialog
        }
      >
        {isProfileDialogOpen && (
          <UserCard
            user={currentUser}
          />
        )}
      </Dialog>
    </div>
  );
};
