import type {
  DialogRootProps,
} from '@primereact/ui/dialog';

import type {
  IDialogProps,
} from '../model/dialog';

import type {
  TDialogPosition,
} from '../model/dialogPosition';

type TPrimeReactDialogPosition =
  NonNullable<
    DialogRootProps['position']
  >;

const PRIME_REACT_POSITION_BY_DIALOG_POSITION: Record<
  TDialogPosition,
  TPrimeReactDialogPosition
> = {
  center: 'center',

  top: 'top',

  'top-left': 'topleft',

  'top-right': 'topright',

  bottom: 'bottom',

  'bottom-left':
    'bottomleft',

  'bottom-right':
    'bottomright',

  left: 'left',

  right: 'right',
};

type TDialogAdapterSource = Pick<
  IDialogProps,
  | 'isOpen'
  | 'isModal'
  | 'isDismissable'
  | 'isDraggable'
  | 'position'
>;

type TAdaptedDialogRootProps = Pick<
  DialogRootProps,
  | 'open'
  | 'modal'
  | 'dismissable'
  | 'draggable'
  | 'position'
  | 'scrollBehavior'
>;

export const adaptDialogPropsToPrimeReact = ({
  isOpen,

  isModal = true,

  isDismissable = false,

  isDraggable = false,

  position = 'center',
}: TDialogAdapterSource): TAdaptedDialogRootProps => {
  return {
    open: isOpen,

    modal: isModal,

    dismissable:
    isDismissable,

    draggable:
    isDraggable,

    position:
      PRIME_REACT_POSITION_BY_DIALOG_POSITION[
        position
        ],

    scrollBehavior: 'inside',
  };
};
