// Заглушка для примера, можно интегрировать с real API
export const loginRequest = async (credentials: { email: string; password: string }) => {
  console.log("loginRequest", credentials);
  return { token: 'jwt-token' };
};

export const logoutRequest = async () => { }
