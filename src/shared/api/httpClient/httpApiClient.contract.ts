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
  request(
    config: HttpRequestConfig,
  ): Promise<unknown>;

  get(
    url: string,
    config?: TMethodConfig,
  ): Promise<unknown>;

  post(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<unknown>;

  put(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<unknown>;

  patch(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<unknown>;

  delete(
    url: string,
    config?: TMethodConfig,
  ): Promise<unknown>;
}
