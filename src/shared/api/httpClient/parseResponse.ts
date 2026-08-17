export const parseResponse = async <TResponse>(
  response: Response,
): Promise<TResponse | null> => {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
};
