import {
  Button,
} from 'primereact/button';

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
        label="Выйти"
        icon="pi pi-sign-out"
        loading={isLogoutPending}
        disabled={isLogoutPending}
        onClick={() => {
          void logoutUser();
        }}
      />

      {logoutError !== null && (
        <p role="alert">
          {logoutError}
        </p>
      )}
    </div>
  );
};
