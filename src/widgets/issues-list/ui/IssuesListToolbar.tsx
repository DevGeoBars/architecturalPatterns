import {
  useState,
} from 'react';

import {
  Button,
} from '@primereact/ui/button';

import {
  CreateIssueDialog,
} from './CreateIssueDialog';

import './IssuesListToolbar.scss';

export const IssuesListToolbar = () => {
  const [
    isCreateDialogOpen,
    setIsCreateDialogOpen,
  ] = useState(false);

  const openCreateDialog =
    (): void => {
      setIsCreateDialogOpen(
        true,
      );
    };

  const closeCreateDialog =
    (): void => {
      setIsCreateDialogOpen(
        false,
      );
    };

  return (
    <div className="issues-list-toolbar">
      <Button
        type="button"
        onClick={
          openCreateDialog
        }
      >
        Создать обращение
      </Button>

      <CreateIssueDialog
        isOpen={
          isCreateDialogOpen
        }
        onClose={
          closeCreateDialog
        }
      />
    </div>
  );
};
