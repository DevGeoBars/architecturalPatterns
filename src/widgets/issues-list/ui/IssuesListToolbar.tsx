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

  const handleOpenDialog =
    (): void => {
      setIsCreateDialogOpen(
        true,
      );
    };

  const handleDialogOpenChange = (
    isOpen: boolean,
  ): void => {
    setIsCreateDialogOpen(
      isOpen,
    );
  };

  return (
    <div
      className={
        'issues-list-toolbar'
      }
    >
      <Button
        type="button"
        onClick={
          handleOpenDialog
        }
      >
        Создать обращение
      </Button>

      <CreateIssueDialog
        isOpen={
          isCreateDialogOpen
        }
        onOpenChange={
          handleDialogOpenChange
        }
      />
    </div>
  );
};
