import type { TAppConfig } from '../../config';
import { urlJoin } from '../../lib/urlJoin';

import { parseResponse } from './parseResponse';
import type { HttpRequestConfig, IHttpApiClient, TMethodConfig } from './httpApiClient.contract';
import { HttpClientError } from './httpClientError';

export class HttpApiClient implements IHttpApiClient {
  protected readonly appConfig: TAppConfig;

  protected readonly defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  protected readonly defaultCredentials: RequestCredentials = 'include';

  constructor(appConfig: TAppConfig) {
    this.appConfig = appConfig;
  }

  public get(url: string, config?: TMethodConfig): Promise<unknown> {
    return this.request({ ...config, url, method: 'GET' });
  }

  public post(url: string, body?: unknown, config?: TMethodConfig): Promise<unknown> {
    return this.request({
      ...config,
      url,
      method: 'POST',
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: { ...config?.headers },
    });
  }

  public put(url: string, body?: unknown, config?: TMethodConfig): Promise<unknown> {
    return this.request({
      ...config,
      url,
      method: 'PUT',
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: { ...config?.headers },
    });
  }

  public patch(url: string, body?: unknown, config?: TMethodConfig): Promise<unknown> {
    return this.request({
      ...config,
      url,
      method: 'PATCH',
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: { ...config?.headers },
    });
  }

  public delete(url: string, config?: TMethodConfig): Promise<unknown> {
    return this.request({
      ...config,
      url,
      method: 'DELETE',
      headers: { ...config?.headers },
    });
  }

  public async request({
    url,
    method,
    body,
    headers,
    credentials,
    signal,
  }: HttpRequestConfig): Promise<unknown> {
    const requestUrl = this.appConfig.apiUrl
      ? urlJoin(this.appConfig.apiUrl, url)
      : url;

    const response = await fetch(requestUrl, {
      method,
      body,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      credentials: credentials ?? this.defaultCredentials,
      signal,
    });

    if (!response.ok) {
      const errorBody = await parseResponse(response).catch(() => undefined);
      const errorMessage = typeof errorBody === 'object' && errorBody !== null &&
        'message' in errorBody && typeof errorBody.message === 'string'
        ? errorBody.message
        : undefined;

      throw new HttpClientError(response, errorMessage);
    }

    return parseResponse(response);
  }
}
