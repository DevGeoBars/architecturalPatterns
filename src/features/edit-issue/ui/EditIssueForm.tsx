import { type FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useStore } from 'zustand';

import { Button } from '@primereact/ui/button';

import {
  ISSUE_API_TOKEN,
  ISSUE_REFERENCE_DATA_API_TOKEN,
  ISSUE_STATUSES,
  ISSUE_USER_STATUSES,
  getIssueReferenceDataQueryOptions,
  type IIssueApi,
  type IIssueReferenceDataApi,
  type Issue,
  type IssueReferenceDataItem,
  type TIssueStatusCode,
  type TIssueUserStatusCode,
} from '@/entities/issue';

import { useService } from '@/shared/lib/di';

import { createEditIssueStore } from '../model/editIssueStore';

import './EditIssueForm.scss';

interface IEditIssueFormProps {
  issue: Issue;
  onUpdated?: (issue: Issue) => void;
  onCancel?: () => void;
}

const hasReferenceDataValue = (
  items: IssueReferenceDataItem[],
  value: string,
): boolean => {
  return items.some((item) => item.name === value);
};

export const EditIssueForm = ({
  issue,
  onUpdated,
  onCancel,
}: IEditIssueFormProps) => {
  const issueApi = useService<IIssueApi>(ISSUE_API_TOKEN);
  const issueReferenceDataApi = useService<IIssueReferenceDataApi>(
    ISSUE_REFERENCE_DATA_API_TOKEN,
  );

  const [store] = useState(() => createEditIssueStore(issueApi, issue));

  const formData = useStore(store, (state) => state.formData);
  const requestStatus = useStore(store, (state) => state.requestStatus);
  const error = useStore(store, (state) => state.error);
  const updateField = useStore(store, (state) => state.updateField);
  const submit = useStore(store, (state) => state.submit);

  const {
    data: referenceData,
    isPending: isReferenceDataPending,
    isError: isReferenceDataError,
    error: referenceDataError,
  } = useQuery(
    getIssueReferenceDataQueryOptions(issueReferenceDataApi),
  );

  const isLoading = requestStatus === 'loading';
  const isReferenceDataReady = referenceData !== undefined;

  const isSubmitDisabled =
    isLoading ||
    !isReferenceDataReady ||
    formData.subject.trim() === '' ||
    formData.content.trim() === '' ||
    formData.category.trim() === '';

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const updatedIssue = await submit();

    if (updatedIssue === null) {
      return;
    }

    onUpdated?.(updatedIssue);
  };

  return (
    <form
      className="edit-issue-form"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      {isReferenceDataPending && (
        <p>Загрузка справочников...</p>
      )}

      {isReferenceDataError && (
        <p className="edit-issue-form__error" role="alert">
          {referenceDataError.message}
        </p>
      )}

      <div className="edit-issue-form__grid">
        <label className="edit-issue-form__field edit-issue-form__field--wide">
          <span>Тема</span>

          <input
            type="text"
            value={formData.subject}
            disabled={isLoading}
            required
            onChange={(event) => {
              updateField('subject', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field edit-issue-form__field--wide">
          <span>Описание</span>

          <textarea
            value={formData.content}
            disabled={isLoading}
            required
            rows={6}
            onChange={(event) => {
              updateField('content', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Статус</span>

          <select
            value={formData.statusCode}
            disabled={isLoading}
            onChange={(event) => {
              updateField(
                'statusCode',
                Number(event.target.value) as TIssueStatusCode,
              );
            }}
          >
            {Object.entries(ISSUE_STATUSES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="edit-issue-form__field">
          <span>Статус пользователя</span>

          <select
            value={formData.userStatusCode}
            disabled={isLoading}
            onChange={(event) => {
              updateField(
                'userStatusCode',
                Number(event.target.value) as TIssueUserStatusCode,
              );
            }}
          >
            {Object.entries(ISSUE_USER_STATUSES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="edit-issue-form__field">
          <span>Категория</span>

          <select
            value={formData.category}
            disabled={isLoading || !isReferenceDataReady}
            required
            onChange={(event) => {
              updateField('category', event.target.value);
            }}
          >
            {!formData.category && (
              <option value="" disabled>
                Выберите категорию
              </option>
            )}

            {referenceData &&
              formData.category &&
              !hasReferenceDataValue(
                referenceData.categories,
                formData.category,
              ) && (
                <option value={formData.category}>
                  {formData.category}
                </option>
              )}

            {referenceData?.categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="edit-issue-form__field">
          <span>Владелец</span>

          <input
            type="text"
            value={formData.owner}
            disabled={isLoading}
            onChange={(event) => {
              updateField('owner', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Критичность</span>

          <input
            type="text"
            value={formData.severity}
            disabled={isLoading}
            onChange={(event) => {
              updateField('severity', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Продукт</span>

          <select
            value={formData.product}
            disabled={isLoading || !isReferenceDataReady}
            onChange={(event) => {
              updateField('product', event.target.value);
            }}
          >
            <option value="">Не выбрано</option>

            {referenceData &&
              formData.product &&
              !hasReferenceDataValue(
                referenceData.products,
                formData.product,
              ) && (
                <option value={formData.product}>
                  {formData.product}
                </option>
              )}

            {referenceData?.products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="edit-issue-form__field">
          <span>Версия</span>

          <input
            type="text"
            value={formData.version}
            disabled={isLoading}
            onChange={(event) => {
              updateField('version', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Операционная система</span>

          <select
            value={formData.os}
            disabled={isLoading || !isReferenceDataReady}
            onChange={(event) => {
              updateField('os', event.target.value);
            }}
          >
            <option value="">Не выбрано</option>

            {referenceData &&
              formData.os &&
              !hasReferenceDataValue(referenceData.osTypes, formData.os) && (
                <option value={formData.os}>
                  {formData.os}
                </option>
              )}

            {referenceData?.osTypes.map((osType) => (
              <option key={osType.id} value={osType.name}>
                {osType.name}
              </option>
            ))}
          </select>
        </label>

        <label className="edit-issue-form__field">
          <span>Тип</span>

          <input
            type="text"
            value={formData.type}
            disabled={isLoading}
            onChange={(event) => {
              updateField('type', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Клиент</span>

          <input
            type="text"
            value={formData.client}
            disabled={isLoading}
            onChange={(event) => {
              updateField('client', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Организация</span>

          <input
            type="text"
            value={formData.organization}
            disabled={isLoading}
            onChange={(event) => {
              updateField('organization', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>ИНН заказчика</span>

          <input
            type="text"
            value={formData.customerTaxId}
            disabled={isLoading}
            onChange={(event) => {
              updateField('customerTaxId', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__field">
          <span>Организация заказчика</span>

          <input
            type="text"
            value={formData.customerOrganizationName}
            disabled={isLoading}
            onChange={(event) => {
              updateField('customerOrganizationName', event.target.value);
            }}
          />
        </label>

        <label className="edit-issue-form__checkbox edit-issue-form__field--wide">
          <input
            type="checkbox"
            checked={formData.isClosedByUser}
            disabled={isLoading}
            onChange={(event) => {
              updateField('isClosedByUser', event.target.checked);
            }}
          />

          <span>Закрыто пользователем</span>
        </label>

        <label className="edit-issue-form__checkbox edit-issue-form__field--wide">
          <input
            type="checkbox"
            checked={formData.isDemonstrated}
            disabled={isLoading}
            onChange={(event) => {
              updateField('isDemonstrated', event.target.checked);
            }}
          />

          <span>Обращение продемонстрировано</span>
        </label>
      </div>

      {error !== null && (
        <p className="edit-issue-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="edit-issue-form__actions">
        <Button
          type="button"
          disabled={isLoading}
          onClick={onCancel}
        >
          Отмена
        </Button>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
};
