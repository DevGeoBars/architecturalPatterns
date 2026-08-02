import {
  useState,
} from 'react';

import {
  useStore,
} from 'zustand';

import {
  ISSUE_API_TOKEN,
  type IIssueApi,
  type Issue,
} from '@/entities/issue';

import {
  useService,
} from '@/shared/lib/di';

import {
  CREATE_ISSUE_FIXTURE,
} from '../config/createIssueFixture';

import {
  createCreateIssueStore,
} from '../model/createIssueStore';

interface ICreateIssueButtonProps {
  onCreated?: (
    issue: Issue,
  ) => void;
}

export const CreateIssueButton = ({
  onCreated,
}: ICreateIssueButtonProps) => {
  const issueApi =
    useService<IIssueApi>(
      ISSUE_API_TOKEN,
    );

  const [store] = useState(() => {
    return createCreateIssueStore(
      issueApi,
    );
  });

  const requestStatus = useStore(
    store,
    (state) =>
      state.requestStatus,
  );

  const error = useStore(
    store,
    (state) => state.error,
  );

  const createIssue = useStore(
    store,
    (state) =>
      state.createIssue,
  );

  const handleClick =
    async (): Promise<void> => {
      const createdIssue =
        await createIssue(
          CREATE_ISSUE_FIXTURE,
        );

      if (createdIssue === null) {
        return;
      }

      onCreated?.(createdIssue);
    };

  const isLoading =
    requestStatus === 'loading';

  return (
    <div>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          void handleClick();
        }}
      >
        {isLoading
          ? 'Создание...'
          : 'Создать обращение'}
      </button>

      {error !== null && (
        <p role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
