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
  request<TResponse>(
    config: HttpRequestConfig,
  ): Promise<TResponse>;

  get<TResponse>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse>;

  post<TResponse>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse>;

  put<TResponse>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse>;

  patch<TResponse>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse>;

  delete<TResponse>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse>;
}
