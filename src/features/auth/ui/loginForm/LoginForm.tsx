import {
  type FormEvent,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Button,
} from '@primereact/ui/button';

import {
  APP_ROUTES,
} from '@/shared/routes';
import { HTTP_API_CLIENT_TOKEN, type IHttpApiClient } from '@/shared/api';
import { useService } from '@/shared/di';

import {
  login,
} from '../../api/login';

import {
  useAuthStore,
} from '../../model/authStore';

import './LoginForm.scss';

export const LoginForm = () => {
  const navigate = useNavigate();
  const httpApiClient = useService<IHttpApiClient>(HTTP_API_CLIENT_TOKEN);

  const setAuthenticated =
    useAuthStore(
      (state) =>
        state.setAuthenticated,
    );

  const [
    loginValue,
    setLoginValue,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    isPending,
    setIsPending,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const handleSubmit = async (
    event:
    FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsPending(true);
    setError(null);

    try {
      const user = await login(httpApiClient, {
        login: loginValue.trim(),
        password,
      });

      setAuthenticated(user);

      navigate(
        APP_ROUTES.HOME,
        {
          replace: true,
        },
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось выполнить вход',
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <h1 className="login-form__title">
        Авторизация
      </h1>

      <label
        className="login-form__field"
      >
        <span>Логин</span>

        <input
          name="login"
          type="text"
          value={loginValue}
          autoComplete="username"
          placeholder="Введите логин"
          onChange={(event) => {
            setLoginValue(
              event.target.value,
            );
          }}
        />
      </label>

      <label
        className="login-form__field"
      >
        <span>Пароль</span>

        <input
          name="password"
          type="password"
          value={password}
          autoComplete="current-password"
          placeholder="Введите пароль"
          onChange={(event) => {
            setPassword(
              event.target.value,
            );
          }}
        />
      </label>

      {error !== null && (
        <p
          className="login-form__error"
          role="alert"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={
          isPending ||
          loginValue.trim() === '' ||
          password === ''
        }
      >
        {isPending
          ? 'Вход...'
          : 'Войти'}
      </Button>
    </form>
  );
};
