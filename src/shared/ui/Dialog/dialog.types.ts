import type {
  ReactNode,
} from 'react';

export interface IDialogProps {
  isOpen: boolean;

  title: ReactNode;

  children: ReactNode;

  onClose: () => void;
}
