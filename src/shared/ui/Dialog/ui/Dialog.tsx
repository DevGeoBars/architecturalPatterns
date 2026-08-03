import {
  Dialog as PrimeReactDialog,
  type DialogRootChangeEvent,
} from '@primereact/ui/dialog';

import {
  Button,
} from '@primereact/ui/button';

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

  isDismissable = false,

  isDraggable = false,

  isClosable = true,
}: IDialogProps) => {
  const rootProps =
    adaptDialogPropsToPrimeReact({
      isOpen,
      isModal,
      isDismissable,
      isDraggable,
      position,
    });

  const handleOpenChange = (
    event: DialogRootChangeEvent,
  ): void => {
    onOpenChange(
      event.value === true,
    );
  };

  return (
    <PrimeReactDialog.Root
      {...rootProps}
      onOpenChange={
        handleOpenChange
      }
    >
      <PrimeReactDialog.Portal>
        {isModal && (
          <PrimeReactDialog.Backdrop />
        )}

        <PrimeReactDialog.Positioner>
          <PrimeReactDialog.Popup
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

              {isClosable && (
                <PrimeReactDialog.HeaderActions>
                  <PrimeReactDialog.Close
                    as={Button}
                    type="button"
                    iconOnly
                    rounded
                    variant="text"
                    severity="secondary"
                    aria-label="Закрыть"
                  >
                    <i
                      className="pi pi-times"
                      aria-hidden="true"
                    />
                  </PrimeReactDialog.Close>
                </PrimeReactDialog.HeaderActions>
              )}
            </PrimeReactDialog.Header>

            <PrimeReactDialog.Content>
              {children}
            </PrimeReactDialog.Content>

            {footer !== undefined && (
              <PrimeReactDialog.Footer>
                {footer}
              </PrimeReactDialog.Footer>
            )}
          </PrimeReactDialog.Popup>
        </PrimeReactDialog.Positioner>
      </PrimeReactDialog.Portal>
    </PrimeReactDialog.Root>
  );
};
