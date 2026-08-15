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
  isIssueStatusCode,
  type IIssueApi,
  type IIssueReferenceDataApi,
  type Issue,
  isIssueUserStatusCode,
} from '@/entities/issue';

import { useService } from '@/shared/lib/di';

import { createCreateIssueStore } from '../model/createIssueStore';

import './CreateIssueForm.scss';


interface ICreateIssueFormProps {
  onCreated?: (issue: Issue) => void;
}

const getOptionalString = (value: string): string | undefined => {
  return value === '' ? undefined : value;
};

export const CreateIssueForm = ({ onCreated }: ICreateIssueFormProps) => {
  const issueApi = useService<IIssueApi>(ISSUE_API_TOKEN);
  const issueReferenceDataApi = useService<IIssueReferenceDataApi>(
    ISSUE_REFERENCE_DATA_API_TOKEN,
  );

  const [store] = useState(() => createCreateIssueStore(issueApi));

  const formData = useStore(store, (state) => state.formData);
  const requestStatus = useStore(store, (state) => state.requestStatus);
  const error = useStore(store, (state) => state.error);
  const updateField = useStore(store, (state) => state.updateField);
  const resetForm = useStore(store, (state) => state.resetForm);
  const submit = useStore(store, (state) => state.submit);

  const {
    data: referenceData,
    isPending: isReferenceDataPending,
    isError: isReferenceDataError,
    isFetching: isReferenceDataFetching,
    error: referenceDataError,
    refetch: refetchReferenceData,
  } = useQuery(
    getIssueReferenceDataQueryOptions(issueReferenceDataApi),
  );

  const handleReferenceDataRetry = (): void => {
    void refetchReferenceData();
  };

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

    const createdIssue = await submit();

    if (createdIssue === null) {
      return;
    }

    onCreated?.(createdIssue);
  };

  return (
    <form
      className="create-issue-form"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      {isReferenceDataPending && (
        <p>Загрузка справочников...</p>
      )}

      {isReferenceDataError && (
        <div className="create-issue-form__reference-data-error">
          <p className="create-issue-form__error" role="alert">
            {referenceDataError.message}
          </p>

          <Button
            type="button"
            disabled={isReferenceDataFetching}
            onClick={handleReferenceDataRetry}
          >
            {isReferenceDataFetching ? 'Повторная загрузка...' : 'Повторить'}
          </Button>
        </div>
      )}

      <div className="create-issue-form__grid">
        <label className="create-issue-form__field create-issue-form__field--wide">
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

        <label className="create-issue-form__field create-issue-form__field--wide">
          <span>Описание</span>

          <textarea
            value={formData.content}
            disabled={isLoading}
            required
            rows={5}
            onChange={(event) => {
              updateField('content', event.target.value);
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>Категория</span>

          <select
            value={formData.category}
            disabled={isLoading || !isReferenceDataReady}
            required
            onChange={(event) => {
              updateField('category', event.target.value);
            }}
          >
            <option value="" disabled>
              Выберите категорию
            </option>

            {referenceData?.categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="create-issue-form__field">
          <span>Статус</span>

          <select
            value={formData.statusCode}
            disabled={isLoading}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!isIssueStatusCode(value)) {
                return;
              }
              updateField('statusCode', value);
            }}
          >
            {Object.entries(ISSUE_STATUSES).map(([statusCode, statusName]) => (
              <option key={statusCode} value={statusCode}>
                {statusName}
              </option>
            ))}
          </select>
        </label>

        <label className="create-issue-form__field">
          <span>Статус пользователя</span>

          <select
            value={formData.userStatusCode}
            disabled={isLoading}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (isIssueUserStatusCode(value)) {
                updateField('userStatusCode', value);
              }
            }}
          >
            {Object.entries(ISSUE_USER_STATUSES).map(
              ([statusCode, statusName]) => (
                <option key={statusCode} value={statusCode}>
                  {statusName}
                </option>
              ),
            )}
          </select>
        </label>

        <label className="create-issue-form__field">
          <span>Критичность</span>

          <input
            type="text"
            value={formData.severity ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField('severity', getOptionalString(event.target.value));
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>Продукт</span>

          <select
            value={formData.product ?? ''}
            disabled={isLoading || !isReferenceDataReady}
            onChange={(event) => {
              updateField('product', getOptionalString(event.target.value));
            }}
          >
            <option value="">Не выбрано</option>

            {referenceData?.products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="create-issue-form__field">
          <span>Версия</span>

          <input
            type="text"
            value={formData.version ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField('version', getOptionalString(event.target.value));
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>Операционная система</span>

          <select
            value={formData.os ?? ''}
            disabled={isLoading || !isReferenceDataReady}
            onChange={(event) => {
              updateField('os', getOptionalString(event.target.value));
            }}
          >
            <option value="">Не выбрано</option>

            {referenceData?.osTypes.map((osType) => (
              <option key={osType.id} value={osType.name}>
                {osType.name}
              </option>
            ))}
          </select>
        </label>

        <label className="create-issue-form__field">
          <span>Тип</span>

          <input
            type="text"
            value={formData.type ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField('type', getOptionalString(event.target.value));
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>Организация</span>

          <input
            type="text"
            value={formData.organization ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField('organization', getOptionalString(event.target.value));
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>ID организации</span>

          <input
            type="number"
            min={1}
            value={formData.organizationId ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              const value = event.target.value;

              updateField(
                'organizationId',
                value === '' ? undefined : Number(value),
              );
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>ИНН заказчика</span>

          <input
            type="text"
            value={formData.customerTaxId ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField(
                'customerTaxId',
                getOptionalString(event.target.value),
              );
            }}
          />
        </label>

        <label className="create-issue-form__field">
          <span>Организация заказчика</span>

          <input
            type="text"
            value={formData.customerOrganizationName ?? ''}
            disabled={isLoading}
            onChange={(event) => {
              updateField(
                'customerOrganizationName',
                getOptionalString(event.target.value),
              );
            }}
          />
        </label>

        <label className="create-issue-form__checkbox create-issue-form__field--wide">
          <input
            type="checkbox"
            checked={formData.isDemonstrated ?? false}
            disabled={isLoading}
            onChange={(event) => {
              updateField('isDemonstrated', event.target.checked);
            }}
          />

          <span>Обращение продемонстрировано</span>
        </label>
      </div>

      {error !== null && (
        <p className="create-issue-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="create-issue-form__actions">
        <Button
          type="button"
          disabled={isLoading}
          onClick={resetForm}
        >
          Сбросить
        </Button>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isLoading ? 'Создание...' : 'Создать'}
        </Button>
      </div>
    </form>
  );
};
