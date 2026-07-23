import { useEffect } from 'react';

import {
  useIssuesListStore,
} from '../model/context/useIssuesListStore';

export const IssuesList = () => {
  const issues = useIssuesListStore(
    (state) => state.issues,
  );

  const requestStatus =
    useIssuesListStore(
      (state) => state.requestStatus,
    );

  const error = useIssuesListStore(
    (state) => state.error,
  );

  const loadIssues = useIssuesListStore(
    (state) => state.loadIssues,
  );

  const reloadIssues =
    useIssuesListStore(
      (state) => state.reloadIssues,
    );

  useEffect(() => {
    void loadIssues();
  }, [loadIssues]);

  if (
    requestStatus === 'idle' ||
    requestStatus === 'loading'
  ) {
    return <div>Загрузка заявок...</div>;
  }

  if (requestStatus === 'error') {
    return (
      <div>
        <p>
          {error ??
      'Не удалось загрузить заявки'}
    </p>

    <button
    type="button"
    onClick={() => {
      void reloadIssues();
    }}
  >
    Повторить
    </button>
    </div>
  );
  }

  if (issues.length === 0) {
    return (
      <div>
        <p>Заявки отсутствуют</p>

    <button
    type="button"
    onClick={() => {
      void reloadIssues();
    }}
  >
    Обновить
    </button>
    </div>
  );
  }

  return (
    <div>
      <button
        type="button"
  onClick={() => {
    void reloadIssues();
  }}
>
  Обновить
  </button>

  <table>
  <thead>
    <tr>
      <th>Номер</th>
  <th>Тема</th>
  <th>Статус</th>
  <th>Автор</th>
  <th>Создана</th>
  </tr>
  </thead>

  <tbody>
  {issues.map((issue) => (
      <tr key={issue.id}>
        <td>{issue.number}</td>

        <td>
        {issue.subject ?? 'Без темы'}
        </td>

        <td>{issue.status}</td>

        <td>
        {issue.author ?? '—'}
        </td>

        <td>
        {issue.createdAt
            ? issue.createdAt.toLocaleDateString()
            : '—'}
        </td>
        </tr>
    ))}
  </tbody>
  </table>
  </div>
);
};
