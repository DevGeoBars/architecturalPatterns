import { singleton } from 'tsyringe';

import type { TAppConfig } from '../../config';
import { urlJoin } from '../../lib/urlJoin';

import { parseResponse } from './parseResponse';

import type {
  IHttpApiClient,
  HttpRequestConfig,
  TMethodConfig,
} from './httpApiClient.contract';
import { HttpClientError } from './httpClientError';


@singleton()
export class HttpApiClient
  implements IHttpApiClient
{
  protected readonly appConfig: TAppConfig;

  protected readonly defaultHeaders:
    Record<string, string> = {
    'Content-Type': 'application/json',
  };

  protected readonly defaultCredentials:
    RequestCredentials = 'include';

  constructor(appConfig: TAppConfig) {
    this.appConfig = appConfig;
  }

  public get<TResponse>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      url,
      method: 'GET',
    });
  }

  public post<TResponse>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      url,
      method: 'POST',
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body),
      headers: {
        ...config?.headers,
      },
    });
  }

  public put<TResponse>(
    url: string,
    body?: unknown,
    config?: TMethodConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      url,
      method: 'PUT',
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body),
      headers: {
        ...config?.headers,
      },
    });
  }

  public delete<TResponse>(
    url: string,
    config?: TMethodConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      url,
      method: 'DELETE',
      headers: {
        ...config?.headers,
      },
    });
  }

  public async request<TResponse>({
    url,
    method,
    body,
    headers,
    credentials,
    signal,
  }: HttpRequestConfig): Promise<TResponse> {
    const response = await fetch(
      urlJoin(this.appConfig.apiUrl, url),
      {
        method,
        body,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        credentials:
          credentials ??
          this.defaultCredentials,
        signal,
      },
    );

    if (!response.ok) {
      throw new HttpClientError(response);
    }

    return parseResponse<TResponse>(
      response,
    );
  }
}
