import { IssuesListWidget } from '@/widgets/issues-list';

import './IssuesPage.scss';

export const IssuesPage = () => {
  return (
    <section className="issues-page">
      <h1>Обращения</h1>

      <IssuesListWidget />
    </section>
  );
};
