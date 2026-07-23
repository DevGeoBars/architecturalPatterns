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

import { IssueApi } from "@/entities/issue";
import type { IIssueApi } from "@/entities/issue/api/issueApi";

export const createRootDIContainer = (
  appConfig: TAppConfig,
): DependencyContainer => {
  const rootContainer =
    globalContainer.createChildContainer();

  const httpApiClient =
    new HttpApiClient(appConfig);



  const issueApi =
    new IssueApi(httpApiClient);

  rootContainer.registerInstance<TAppConfig>(
    ROOT_DI_TOKENS.APP_CONFIG,
    appConfig,
  );

  rootContainer.registerInstance<IHttpApiClient>(
    ROOT_DI_TOKENS.HTTP_API_CLIENT,
    httpApiClient,
  );

  rootContainer.registerInstance<IIssueApi>(
    ROOT_DI_TOKENS.ISSUE_API,
    issueApi,
  );

  return rootContainer;
};
