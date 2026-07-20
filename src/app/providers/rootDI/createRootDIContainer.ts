import {
  container as globalContainer,
  type DependencyContainer,
} from 'tsyringe';

import {
  HttpApiClient,
  type IHttpApiClient,
} from '@/shared/api/httpClient';

import {
  type TAppConfig,
} from '@/shared/config';

import {
  ROOT_DI_TOKENS
} from './rootDITokens';

export const createRootDIContainer =
  (appConfig: TAppConfig): DependencyContainer => {
    const rootContainer =
      globalContainer.createChildContainer();

    rootContainer.register<TAppConfig>(
      ROOT_DI_TOKENS.APP_CONFIG,
      {
        useValue: appConfig,
      },
    );

    rootContainer.register<IHttpApiClient>(
      ROOT_DI_TOKENS.HTTP_API_CLIENT,
      {
        useValue:
          new HttpApiClient(appConfig),
      },
    );

    return rootContainer;
  };
