interface ILogoutErrorResponse {
  message?: string;
}

export const logout =
  async (): Promise<void> => {
    const response = await fetch(
      '/api/auth/logout',
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorResponse =
        (await response
          .json()
          .catch(() => null)) as
          | ILogoutErrorResponse
          | null;

      throw new Error(
        errorResponse?.message ??
        'Не удалось выполнить выход',
      );
    }
  };
