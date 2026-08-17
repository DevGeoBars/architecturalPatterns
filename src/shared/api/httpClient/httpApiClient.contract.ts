export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

export type HttpRequestConfig = {
  url: string;
  method?: THttpMethod;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
};

export type TMethodConfig = Omit<
  HttpRequestConfig,
  'url' | 'method' | 'body'
> & {
  retry?: boolean;
};

export interface IHttpApiClient {
  request<TResponse = unknown>(
    config: HttpRequestConfig,
  ): Promise<TResponse | null>;

  get<TResponse = unknown>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse | null>;

  post<TResponse = unknown>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse | null>;

  put<TResponse = unknown>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse | null>;

  patch<TResponse = unknown>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse | null>;

  delete<TResponse = unknown>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse | null>;
}
