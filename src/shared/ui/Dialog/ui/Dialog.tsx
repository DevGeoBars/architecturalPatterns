import {
  Dialog as PrimeReactDialog,
} from '@primereact/ui/dialog';

import type {
  DialogChangeEvent,
} from '@primereact/types/shared/dialog';

import {
  adaptDialogPropsToPrimeReact,
} from '../lib/adaptDialogPropsToPrimeReact';

import type {
  IDialogProps,
} from '../model/dialog';

export const Dialog = ({
  isOpen,
  title,
  children,
  footer,

  onOpenChange,

  width = '48rem',

  position = 'center',

  isModal = true,

  isDraggable = false,

  isClosable = true,

  isMaximizable = false,

  closeOnEscape = true,
}: IDialogProps) => {
  const primeReactProps =
    adaptDialogPropsToPrimeReact({
      isOpen,
      isModal,
      isDraggable,
      closeOnEscape,
      position,
    });

  const handleOpenChange = (
    event: DialogChangeEvent,
  ): void => {
    onOpenChange(
      event.value === true,
    );
  };

  return (
    <PrimeReactDialog
      {...primeReactProps}
      onOpenChange={
        handleOpenChange
      }
    >
      <PrimeReactDialog.Portal
        style={{
          width,

          maxWidth:
            'calc(100vw - 32px)',
        }}
      >
        <PrimeReactDialog.Header>
          <PrimeReactDialog.Title>
            {title}
          </PrimeReactDialog.Title>

          <PrimeReactDialog.HeaderActions>
            {isMaximizable && (
              <PrimeReactDialog.Maximizable />
            )}

            {isClosable && (
              <PrimeReactDialog.Close />
            )}
          </PrimeReactDialog.HeaderActions>
        </PrimeReactDialog.Header>

        <PrimeReactDialog.Content
          style={{
            maxHeight:
              'calc(100vh - 160px)',

            overflowY: 'auto',
          }}
        >
          {children}
        </PrimeReactDialog.Content>

        {footer !== undefined && (
          <PrimeReactDialog.Footer>
            {footer}
          </PrimeReactDialog.Footer>
        )}
      </PrimeReactDialog.Portal>
    </PrimeReactDialog>
  );
};
