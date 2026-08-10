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

  type IIssueApi,

  type Issue,
} from '@/entities/issue';

import {
  useUserStore,
} from '@/entities/user';

import {
  useService,
} from '@/shared/lib/di';

import {
  HtmlEditor,
} from '@/shared/ui/HtmlEditor';

import {
  isAddCommentContentEmpty,
} from '../lib/validateAddCommentData';

import {
  createAddCommentStore,
} from '../model/addCommentStore';

import './AddCommentForm.scss';

interface IAddCommentFormProps {
  issue: Issue;

  onAdded?: (
    issue: Issue,
  ) => void;
}

export const AddCommentForm = ({
  issue,

  onAdded,
}: IAddCommentFormProps) => {
  const issueApi =
    useService<IIssueApi>(
      ISSUE_API_TOKEN,
    );

  const currentUser =
    useUserStore(
      (state) =>
        state.currentUser,
    );

  const [store] =
    useState(
      () =>
        createAddCommentStore(
          issueApi,
        ),
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

  const setContent =
    useStore(
      store,

      (state) =>
        state.setContent,
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
    currentUser === null ||
    isLoading ||
    isAddCommentContentEmpty(
      formData.content,
    );

  const handleSubmit =
    async (
      event:
      FormEvent<HTMLFormElement>,
    ): Promise<void> => {
      event.preventDefault();

      if (
        currentUser ===
        null
      ) {
        return;
      }

      const updatedIssue =
        await submit(
          issue,

          currentUser.id,

          currentUser.name,
        );

      if (
        updatedIssue ===
        null
      ) {
        return;
      }

      onAdded?.(
        updatedIssue,
      );
    };

  return (
    <form
      className="add-comment-form"
      onSubmit={(
        event,
      ) => {
        void handleSubmit(
          event,
        );
      }}
    >
      <div className="add-comment-form__editor">
        <HtmlEditor
          value={
            formData.content
          }
          isDisabled={
            isLoading
          }
          onChange={
            setContent
          }
        />
      </div>

      {error !== null && (
        <p
          className="add-comment-form__error"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="add-comment-form__actions">
        <Button
          type="submit"
          disabled={
            isSubmitDisabled
          }
        >
          {isLoading
            ? 'Добавление...'
            : 'Добавить'}
        </Button>
      </div>
    </form>
  );
};
