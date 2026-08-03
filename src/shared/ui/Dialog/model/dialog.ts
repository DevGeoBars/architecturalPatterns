import type {
  ReactNode,
} from 'react';

import type {
  TDialogPosition,
} from './dialogPosition';



export interface IDialogProps {
  isOpen: boolean;

  title: ReactNode;

  children: ReactNode;

  onOpenChange: (
    isOpen: boolean,
  ) => void;

  footer?: ReactNode;

  width?: string;

  position?: TDialogPosition;



  isModal?: boolean;

  isDismissable?: boolean;

  isDraggable?: boolean;

  isClosable?: boolean;

  isMaximizable?: boolean;
}
