import type { Issue } from '../../model/issue/types/issue';
import { getResponsibleFullName } from '../../model/issue/types/responsible';

import './IssueDetails.scss';

interface IIssueDetailsProps {
  issue: Issue;
}

const issueDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const getTextValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '—';
  }

  const normalizedValue = String(value).trim();

  return normalizedValue || '—';
};

const getDateValue = (value: Date | undefined): string => {
  return value ? issueDateFormatter.format(value) : '—';
};

const getBooleanLabel = (value: boolean): string => {
  return value ? 'Да' : 'Нет';
};

export const IssueDetails = ({ issue }: IIssueDetailsProps) => {
  const responsibleName = issue.responsible
    ? getResponsibleFullName(issue.responsible)
    : undefined;

  const directionName = issue.directionName ?? issue.direction?.name;

  const details = [
    { label: 'Статус', value: issue.status },
    { label: 'Статус пользователя', value: issue.userStatus },
    { label: 'Категория', value: getTextValue(issue.category) },
    { label: 'Критичность', value: getTextValue(issue.severity) },
    { label: 'Тип', value: getTextValue(issue.type) },
    { label: 'Автор', value: getTextValue(issue.author) },
    { label: 'Email автора', value: getTextValue(issue.authorEmail) },
    { label: 'Владелец', value: getTextValue(issue.owner) },
    { label: 'Ответственный', value: getTextValue(responsibleName) },
    { label: 'Email ответственного', value: getTextValue(issue.responsible?.email) },
    { label: 'Создано', value: getDateValue(issue.createdAt) },
    { label: 'Обновлено', value: getDateValue(issue.updatedAt) },
    { label: 'Обновил', value: getTextValue(issue.updatedBy) },
    { label: 'Продукт', value: getTextValue(issue.product) },
    { label: 'Версия', value: getTextValue(issue.version) },
    { label: 'Операционная система', value: getTextValue(issue.os) },
    { label: 'Клиент', value: getTextValue(issue.client) },
    { label: 'Организация', value: getTextValue(issue.organization) },
    { label: 'ID организации', value: getTextValue(issue.organizationId) },
    { label: 'Направление', value: getTextValue(directionName) },
    { label: 'ИНН заказчика', value: getTextValue(issue.customerTaxId) },
    { label: 'Организация заказчика', value: getTextValue(issue.customerOrganizationName) },
    { label: 'Закрыто пользователем', value: getBooleanLabel(issue.isClosedByUser) },
    { label: 'Продемонстрировано', value: getBooleanLabel(issue.isDemonstrated) },
  ];

  return (
    <div className="issue-details">
    <header className="issue-details__header">
    <div>
      <span className="issue-details__number">Обращение №{issue.number}</span>
  <h2 className="issue-details__subject">{getTextValue(issue.subject)}</h2>
  </div>

  <span className="issue-details__status">{issue.status}</span>
    </header>

    <dl className="issue-details__details">
    {details.map(({ label, value }) => (
        <div key={label} className="issue-details__detail">
        <dt>{label}</dt>
        <dd>{value}</dd>
        </div>
))}
  </dl>

  <section className="issue-details__section">
    <h3>Описание</h3>
    <p className="issue-details__content">{getTextValue(issue.content)}</p>
  </section>

  <div className="issue-details__counters">
  <div className="issue-details__counter">
    <span>Комментарии</span>
    <strong>{issue.comments.length}</strong>
    </div>

    <div className="issue-details__counter">
    <span>Файлы</span>
    <strong>{issue.files.length}</strong>
    </div>

    <div className="issue-details__counter">
    <span>Метки</span>
    <strong>{issue.labels.length}</strong>
    </div>

    <div className="issue-details__counter">
    <span>Связанные обращения</span>
  <strong>{issue.relatedIssues.length}</strong>
  </div>

  <div className="issue-details__counter">
    <span>Предложения</span>
    <strong>{issue.relatedSuggestions.length}</strong>
    </div>
    </div>

  {issue.files.length > 0 && (
    <section className="issue-details__section">
      <h3>Файлы</h3>

      <ul className="issue-details__list">
    {issue.files.map((file) => (
        <li key={file.id}>{file.name}</li>
      ))}
    </ul>
    </section>
  )}

  {issue.labels.length > 0 && (
    <section className="issue-details__section">
      <h3>Метки</h3>

      <ul className="issue-details__list">
    {issue.labels.map((label) => (
        <li key={label.id}>{label.name}</li>
      ))}
    </ul>
    </section>
  )}
  </div>
);
};
