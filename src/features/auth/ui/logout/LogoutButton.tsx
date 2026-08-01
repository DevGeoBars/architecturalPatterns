import {
  Button,
} from '@primereact/ui/button';

import {
  useLogout,
} from '../../lib/useLogout';

export const LogoutButton = () => {
  const {
    logoutUser,
    isLogoutPending,
    logoutError,
  } = useLogout();

  return (
    <div>
      <Button
        type="button"
        disabled={isLogoutPending}
        onClick={() => {
          void logoutUser();
        }}
      >
        {isLogoutPending
          ? 'Выход...'
          : 'Выйти'}
      </Button>

      {logoutError !== null && (
        <p role="alert">
          {logoutError}
        </p>
      )}
    </div>
  );
};
