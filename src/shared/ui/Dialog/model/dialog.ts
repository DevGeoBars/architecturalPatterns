import type {
  ReactNode,
} from 'react';

import type {
  TDialogPosition,
} from './dialogPosition';

export interface IDialogProps {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  onOpenChange: (
    isOpen: boolean,
  ) => void;

  footer?: ReactNode;

  width?: string;

  position?: TDialogPosition;

  isModal?: boolean;

  isDraggable?: boolean;

  isClosable?: boolean;

  isMaximizable?: boolean;

  closeOnEscape?: boolean;
}
