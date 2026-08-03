import type {
  IDialogProps,
} from '../model/dialog';

import type {
  TDialogPosition,
} from '../model/dialogPosition';

interface IPrimeReactDialogProps {
  open: boolean;

  modal: boolean;

  draggable: boolean;

  closeOnEscape: boolean;

  position: TDialogPosition;
}

type TAdaptedDialogProps = Pick<
  IDialogProps,
  | 'isOpen'
  | 'isModal'
  | 'isDraggable'
  | 'closeOnEscape'
  | 'position'
>;

export const adaptDialogPropsToPrimeReact = ({
  isOpen,
  isModal = true,
  isDraggable = false,
  closeOnEscape = true,
  position = 'center',
}: TAdaptedDialogProps): IPrimeReactDialogProps => {
  return {
    open: isOpen,

    modal: isModal,

    draggable: isDraggable,

    closeOnEscape,

    position,
  };
};
