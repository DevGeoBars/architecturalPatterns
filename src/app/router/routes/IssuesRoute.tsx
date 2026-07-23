import type { IIssueApi } from '@/entities/issue';
import { lazyPage } from '@/shared/lib/lazy-loading';
import type {
  IIssuesPageProps,
} from '@/pages/issues';

import {
  ROOT_DI_TOKENS,
  useRootContainer,
} from '../../providers/rootDI';


const IssuesPage = lazyPage<IIssuesPageProps>(
  () => import('@/pages/issues'),
  'IssuesPage',
);

export const IssuesRoute = () => {
  const container = useRootContainer();

  const issueApi = container.resolve<IIssueApi>(
    ROOT_DI_TOKENS.ISSUE_API,
  );

  return (
    <IssuesPage issueApi={issueApi} />
  );
};
