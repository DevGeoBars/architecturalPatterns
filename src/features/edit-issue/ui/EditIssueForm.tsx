import {
  type FormEvent,

  useState,
} from 'react';

import {
  useStore,
} from 'zustand';

import {
  Button,
} from '@primereact/ui/button';

import {
  ISSUE_API_TOKEN,

  ISSUE_STATUSES,

  ISSUE_USER_STATUSES,

  type IIssueApi,

  type Issue,

  type TIssueStatusCode,

  type TIssueUserStatusCode,
} from '@/entities/issue';

import {
  useService,
} from '@/shared/lib/di';

import {
  createEditIssueStore,
} from '../model/editIssueStore';

import './EditIssueForm.scss';

interface IEditIssueFormProps {
  issue: Issue;

  onUpdated?: (
    issue: Issue,
  ) => void;

  onCancel?: () => void;
}

export const EditIssueForm = ({
  issue,

  onUpdated,

  onCancel,
}: IEditIssueFormProps) => {
  const issueApi =
    useService<IIssueApi>(
      ISSUE_API_TOKEN,
    );

  const [store] = useState(
    () => {
      return createEditIssueStore(
        issueApi,

        issue,
      );
    },
  );

  const formData =
    useStore(
      store,

      (state) =>
        state.formData,
    );

  const requestStatus =
    useStore(
      store,

      (state) =>
        state.requestStatus,
    );

  const error =
    useStore(
      store,

      (state) =>
        state.error,
    );

  const updateField =
    useStore(
      store,

      (state) =>
        state.updateField,
    );

  const submit =
    useStore(
      store,

      (state) =>
        state.submit,
    );

  const isLoading =
    requestStatus ===
    'loading';

  const isSubmitDisabled =
    isLoading ||
    formData.subject.trim() ===
    '' ||
    formData.content.trim() ===
    '' ||
    formData.category.trim() ===
    '';

  const handleSubmit = async (
    event:
    FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const updatedIssue =
      await submit();

    if (
      updatedIssue === null
    ) {
      return;
    }

    onUpdated?.(
      updatedIssue,
    );
  };

  return (
    <form
      className="edit-issue-form"
  onSubmit={(event) => {
    void handleSubmit(
      event,
    );
  }}
>
  <div className="edit-issue-form__grid">
  <label className="edit-issue-form__field edit-issue-form__field--wide">
    <span>
      Тема
    </span>

    <input
  type="text"
  value={
    formData.subject
  }
  disabled={
    isLoading
  }
  required
  onChange={(
    event,
  ) => {
    updateField(
      'subject',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field edit-issue-form__field--wide">
    <span>
      Описание
    </span>

    <textarea
  value={
    formData.content
  }
  disabled={
    isLoading
  }
  required
  rows={6}
  onChange={(
    event,
  ) => {
    updateField(
      'content',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Статус
    </span>

    <select
  value={
    formData.statusCode
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'statusCode',

      Number(
        event.target
          .value,
      ) as TIssueStatusCode,
    );
  }}
>
  {Object.entries(
    ISSUE_STATUSES,
  ).map(
    ([
      code,

      name,
    ]) => (
      <option
        key={code}
    value={code}
      >
      {name}
      </option>
  ),
  )}
  </select>
  </label>

  <label className="edit-issue-form__field">
    <span>
      Статус пользователя
  </span>

  <select
  value={
    formData
    .userStatusCode
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'userStatusCode',

      Number(
        event.target
          .value,
      ) as TIssueUserStatusCode,
    );
  }}
>
  {Object.entries(
    ISSUE_USER_STATUSES,
  ).map(
    ([
      code,

      name,
    ]) => (
      <option
        key={code}
    value={code}
      >
      {name}
      </option>
  ),
  )}
  </select>
  </label>

  <label className="edit-issue-form__field">
    <span>
      Категория
    </span>

    <input
  type="text"
  value={
    formData.category
  }
  disabled={
    isLoading
  }
  required
  onChange={(
    event,
  ) => {
    updateField(
      'category',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Владелец
    </span>

    <input
  type="text"
  value={
    formData.owner
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'owner',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Критичность
    </span>

    <input
  type="text"
  value={
    formData.severity
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'severity',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Продукт
    </span>

    <input
  type="text"
  value={
    formData.product
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'product',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Версия
    </span>

    <input
  type="text"
  value={
    formData.version
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'version',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Операционная система
  </span>

  <input
  type="text"
  value={
    formData.os
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'os',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Тип
    </span>

    <input
  type="text"
  value={
    formData.type
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'type',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Клиент
    </span>

    <input
  type="text"
  value={
    formData.client
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'client',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Организация
    </span>

    <input
  type="text"
  value={
    formData.organization
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'organization',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      ИНН заказчика
  </span>

  <input
  type="text"
  value={
    formData.customerTaxId
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'customerTaxId',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__field">
    <span>
      Организация заказчика
  </span>

  <input
  type="text"
  value={
    formData
    .customerOrganizationName
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'customerOrganizationName',

      event.target
        .value,
    );
  }}
  />
  </label>

  <label className="edit-issue-form__checkbox edit-issue-form__field--wide">
  <input
    type="checkbox"
  checked={
    formData
    .isClosedByUser
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'isClosedByUser',

      event.target
        .checked,
    );
  }}
  />

  <span>
  Закрыто пользователем
  </span>
  </label>

  <label className="edit-issue-form__checkbox edit-issue-form__field--wide">
  <input
    type="checkbox"
  checked={
    formData
    .isDemonstrated
  }
  disabled={
    isLoading
  }
  onChange={(
    event,
  ) => {
    updateField(
      'isDemonstrated',

      event.target
        .checked,
    );
  }}
  />

  <span>
  Обращение продемонстрировано
  </span>
  </label>
  </div>

  {error !== null && (
    <p
      className="edit-issue-form__error"
    role="alert"
      >
      {error}
      </p>
  )}

  <div className="edit-issue-form__actions">
  <Button
    type="button"
  disabled={
    isLoading
  }
  onClick={
      onCancel
    }
    >
    Отмена
    </Button>

    <Button
  type="submit"
  disabled={
    isSubmitDisabled
  }
  >
  {isLoading
    ? 'Сохранение...'
    : 'Сохранить'}
  </Button>
  </div>
  </form>
);
};
