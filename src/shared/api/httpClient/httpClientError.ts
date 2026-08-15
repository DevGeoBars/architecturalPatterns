export class HttpClientError extends Error {
  readonly status: number;

  readonly response: Response;

  constructor(response: Response, message?: string) {
    super(
      message ?? `Ошибка HTTP-запроса. Статус: ${response.status}, текст: ${response.statusText}`,
    );

    this.name = 'HttpClientError';
    this.status = response.status;
    this.response = response;
  }
}
