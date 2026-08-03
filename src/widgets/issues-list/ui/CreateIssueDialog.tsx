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

  onOpenChange: (
    isOpen: boolean,
  ) => void;
}

export const CreateIssueDialog = ({
  isOpen,
  onOpenChange,
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

    onOpenChange(false);
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Создание обращения"
      width="64rem"
      position="center"
      scrollBehavior="inside"
      isModal
      isDismissable={false}
      isDraggable={false}
      isClosable
      onOpenChange={
        onOpenChange
      }
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
