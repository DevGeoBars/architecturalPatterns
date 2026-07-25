import type {
  InjectionToken,
} from 'tsyringe';

import type {
  IHttpApiClient,
} from './httpApiClient.contract';

export const HTTP_API_CLIENT_TOKEN:
  InjectionToken<IHttpApiClient> =
  Symbol('HTTP_API_CLIENT_TOKEN');
