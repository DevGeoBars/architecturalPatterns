export const parseResponse = async <TResponse>(
  response: Response,
): Promise<TResponse> => {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();

  if (!text) {
    return undefined as TResponse;
  }

  const contentType =
    response.headers.get('content-type') ?? '';

  if (
    contentType.includes(
      'application/json',
    )
  ) {
    return JSON.parse(text) as TResponse;
  }

  return text as TResponse;
};
