import type {
  Issue,
} from '@/entities/issue';

import {
  CreateIssueForm,
} from '@/features/create-issue';

import {
  Dialog,
} from '@/shared/ui/Dialog';

import {
  useIssuesStore,
} from '../model/context/useIssuesStore';

interface ICreateIssueDialogProps {
  isOpen: boolean;

  onClose: () => void;
}

export const CreateIssueDialog = ({
  isOpen,
  onClose,
}: ICreateIssueDialogProps) => {
  const addIssue =
    useIssuesStore(
      (state) =>
        state.addIssue,
    );

  const handleCreated = (
    issue: Issue,
  ): void => {
    addIssue(issue);

    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Создание обращения"
      onClose={onClose}
    >
      {isOpen && (
        <CreateIssueForm
          onCreated={
            handleCreated
          }
        />
      )}
    </Dialog>
  );
};
