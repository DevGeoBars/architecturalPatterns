import { useCallback } from 'react';
// import { useUserStore } from '@/entities/user'; // todo@bars - реализовать
import { loginRequest, logoutRequest } from '../api/authApi';

export const useAuth = () => {
  //@ts-ignore todo@bars - реализовать
  const { setUser, user } = useUserStore();

  const login = useCallback(async (email: string, password: string) => {
    const { token } = await loginRequest({ email, password });
    // сохранить токен, получить пользователя и т.д.
    console.log("login request", token, token);
    setUser({ Role: 'Admin', ClaimsActivity: '' }); // упрощённо
  }, [setUser]);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, [setUser]);

  return { user, login, logout };
};
