import {
  container as globalContainer,
  type DependencyContainer,
} from 'tsyringe';

import {
  HttpApiClient,
  type IHttpApiClient,
} from '@/shared/api/httpClient';
import type { TAppConfig } from '@/shared/config';

import { ROOT_DI_TOKENS } from './rootDITokens';

export const createRootDIContainer = (
  appConfig: TAppConfig,
): DependencyContainer => {
  const rootContainer =
    globalContainer.createChildContainer();

  const httpApiClient =
    new HttpApiClient(appConfig);

  rootContainer.registerInstance<TAppConfig>(
    ROOT_DI_TOKENS.APP_CONFIG,
    appConfig,
  );

  rootContainer.registerInstance<IHttpApiClient>(
    ROOT_DI_TOKENS.HTTP_API_CLIENT,
    httpApiClient,
  );

  return rootContainer;
};
