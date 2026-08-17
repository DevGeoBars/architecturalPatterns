import { container, type DependencyContainer } from 'tsyringe';

import {
  ClaimApi,
  CLAIM_API_TOKEN,
  type IClaimApi,
} from '@/entities/claim';

import {
  IssueApi,
  IssueStaticDictionariesApi,
  ISSUE_API_TOKEN,
  ISSUE_STATIC_DICTIONARIES_API_TOKEN,
  type IIssueApi,
  type IIssueStaticDictionariesApi,
} from '@/entities/issue';

import {
  HTTP_API_CLIENT_TOKEN,
  HttpApiClient,
  type IHttpApiClient,
} from '@/shared/api';

import type { TAppConfig } from '@/shared/config';

export const createRootDIContainer = (
  appConfig: TAppConfig,
): DependencyContainer => {
  const rootContainer = container.createChildContainer();

  rootContainer.registerInstance<IHttpApiClient>(
    HTTP_API_CLIENT_TOKEN,
    new HttpApiClient(appConfig),
  );

  rootContainer.register<IIssueApi>(ISSUE_API_TOKEN, {
    useFactory: (dependencyContainer) => {
      const httpApiClient =
        dependencyContainer.resolve<IHttpApiClient>(
          HTTP_API_CLIENT_TOKEN,
        );

      return new IssueApi(httpApiClient);
    },
  });

  rootContainer.register<IIssueStaticDictionariesApi>(
    ISSUE_STATIC_DICTIONARIES_API_TOKEN,
    {
      useFactory: (dependencyContainer) => {
        const httpApiClient =
          dependencyContainer.resolve<IHttpApiClient>(
            HTTP_API_CLIENT_TOKEN,
          );

        return new IssueStaticDictionariesApi(httpApiClient);
      },
    },
  );

  rootContainer.register<IClaimApi>(CLAIM_API_TOKEN, {
    useFactory: (dependencyContainer) => {
      const httpApiClient =
        dependencyContainer.resolve<IHttpApiClient>(
          HTTP_API_CLIENT_TOKEN,
        );

      return new ClaimApi(httpApiClient);
    },
  });

  return rootContainer;
};
