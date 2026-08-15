export const parseResponse = async (
  response: Response,
): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType =
    response.headers.get('content-type') ?? '';

  if (
    contentType.includes(
      'application/json',
    )
  ) {
    return JSON.parse(text);
  }

  return text;
};
