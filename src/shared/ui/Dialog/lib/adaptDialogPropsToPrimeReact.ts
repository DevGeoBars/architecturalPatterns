import type {
  DialogRootProps,
} from '@primereact/ui/dialog';

import type {
  IDialogProps,
} from '../model/dialog';

type TDialogAdapterSource = Pick<
  IDialogProps,
  'isOpen'
>;

type TAdaptedDialogRootProps = Pick<
  DialogRootProps,
  'open'
>;

export const adaptDialogPropsToPrimeReact = ({
  isOpen,
}: TDialogAdapterSource): TAdaptedDialogRootProps => {
  return {
    open: isOpen,
  };
};
