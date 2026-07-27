import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from 'react';

import {
  Button,
} from '@primereact/ui/button';

import {
  login,
} from '../api/login';

import './LoginPage.scss';

export const LoginPage = () => {
  const [loginValue, setLoginValue] =
    useState('');

  const [
    passwordValue,
    setPasswordValue,
  ] = useState('');

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLoginChange = (
    event:
    ChangeEvent<HTMLInputElement>,
  ) => {
    setLoginValue(
      event.target.value,
    );
  };

  const handlePasswordChange = (
    event:
    ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordValue(
      event.target.value,
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const user = await login({
        login: loginValue,
        password: passwordValue,
      });

      console.log(
        'Авторизованный пользователь:',
        user,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось авторизоваться',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
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
            type="text"
            value={loginValue}
            onChange={
              handleLoginChange
            }
            autoComplete="username"
            placeholder="Введите логин"
          />
        </label>

        <label
          className="login-form__field"
        >
          <span>Пароль</span>

          <input
            type="password"
            value={passwordValue}
            onChange={
              handlePasswordChange
            }
            autoComplete="current-password"
            placeholder="Введите пароль"
          />
        </label>

        {error && (
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
            isLoading ||
            !loginValue.trim() ||
            !passwordValue
          }
        >
          {isLoading
            ? 'Вход...'
            : 'Войти'}
        </Button>
      </form>
    </div>
  );
};
