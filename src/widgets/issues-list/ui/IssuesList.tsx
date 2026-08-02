import {
  useEffect,
} from 'react';

import {
  useIssuesStore,
} from '../model/context/useIssuesStore';

export const IssuesList = () => {
  const issues =
    useIssuesStore(
      (state) =>
        state.issues,
    );

  const requestStatus =
    useIssuesStore(
      (state) =>
        state.requestStatus,
    );

  const error =
    useIssuesStore(
      (state) =>
        state.error,
    );

  const loadIssues =
    useIssuesStore(
      (state) =>
        state.loadIssues,
    );

  const reloadIssues =
    useIssuesStore(
      (state) =>
        state.reloadIssues,
    );

  useEffect(() => {
    void loadIssues();
  }, [loadIssues]);

  if (
    requestStatus === 'idle' ||
    requestStatus === 'loading'
  ) {
    return (
      <div>
        Загрузка обращений...
      </div>
    );
  }

  if (
    requestStatus === 'error'
  ) {
    return (
      <div>
        <p role="alert">
          {error ??
            'Не удалось загрузить обращения'}
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
        <p>
          Обращения отсутствуют
        </p>

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
        {issues.map(
          (issue) => (
            <tr key={issue.id}>
              <td>
                {issue.number}
              </td>

              <td>
                {issue.subject ??
                  'Без темы'}
              </td>

              <td>
                {issue.status}
              </td>

              <td>
                {issue.author ??
                  '—'}
              </td>

              <td>
                {issue.createdAt
                  ? issue.createdAt.toLocaleDateString()
                  : '—'}
              </td>
            </tr>
          ),
        )}
        </tbody>
      </table>
    </div>
  );
};
