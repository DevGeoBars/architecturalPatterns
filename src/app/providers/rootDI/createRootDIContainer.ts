import {
  container,
  type DependencyContainer,
} from 'tsyringe';

import {
  IssueApi,
  ISSUE_API_TOKEN,
  type IIssueApi,
} from '@/entities/issue';

import {
  HTTP_API_CLIENT_TOKEN,
  HttpApiClient,
  type IHttpApiClient,
} from '@/shared/api/httpClient';

import type {
  TAppConfig,
} from '@/shared/config';

export const createRootDIContainer = (
  appConfig: TAppConfig,
): DependencyContainer => {
  const rootContainer =
    container.createChildContainer();

  rootContainer.registerInstance<IHttpApiClient>(
    HTTP_API_CLIENT_TOKEN,
    new HttpApiClient(appConfig),
  );

  rootContainer.register<IIssueApi>(
    ISSUE_API_TOKEN,
    {
      useFactory: (dependencyContainer) => {
        const httpApiClient =
          dependencyContainer.resolve<IHttpApiClient>(
            HTTP_API_CLIENT_TOKEN,
          );

        return new IssueApi(
          httpApiClient,
        );
      },
    },
  );

  return rootContainer;
};
