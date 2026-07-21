import { useCallback } from 'react';

import { useUserStore } from "@/entities/user"; // todo@bars - реализовать
import { loginRequest, logoutRequest } from '../api/authApi';


export const useAuth = () => {

  const { loadCurrentUser, clearCurrentUser, currentUser } = useUserStore();

  const login = useCallback(async (email: string, password: string) => {
    const { token } = await loginRequest({ email, password });
    console.log('token', token);
    await loadCurrentUser(); // упрощённо
  }, [loadCurrentUser]);

  const logout = useCallback(async () => {
    await logoutRequest();
    clearCurrentUser();
  }, [clearCurrentUser]);

  return {currentUser, login, logout };
};
