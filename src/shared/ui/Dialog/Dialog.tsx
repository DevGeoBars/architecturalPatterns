import {
  Dialog as PrimeReactDialog,
  type DialogRootChangeEvent,
} from '@primereact/ui/dialog';

import {
  Button,
} from '@primereact/ui/button';

import {
  adaptDialogPropsToPrimeReact,
} from './adaptDialogPropsToPrimeReact';

import type {
  IDialogProps,
} from './dialog.types';

export const Dialog = ({
  isOpen,
  title,
  children,
  onClose,
}: IDialogProps) => {
  const primeReactRootProps =
    adaptDialogPropsToPrimeReact({
      isOpen,
    });



  return (
    <PrimeReactDialog.Root
      {...primeReactRootProps}
      modal
      dismissable={false}
      draggable={false}
      position="center"
      scrollBehavior="inside"
      onOpenChange={(event: DialogRootChangeEvent) => {
        if (!event.value) {
          onClose();
        }
      }}
    >
      <PrimeReactDialog.Portal>
        <PrimeReactDialog.Backdrop />

        <PrimeReactDialog.Positioner>
          <PrimeReactDialog.Popup
            style={{
              width:
                'min(64rem, calc(100vw - 32px))',

              maxHeight:
                'calc(100vh - 32px)',
            }}
          >
            <PrimeReactDialog.Header>
              <PrimeReactDialog.Title>
                {title}
              </PrimeReactDialog.Title>

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
                  <span
                    aria-hidden="true"
                  >
                    ×
                  </span>
                </PrimeReactDialog.Close>
              </PrimeReactDialog.HeaderActions>
            </PrimeReactDialog.Header>

            <PrimeReactDialog.Content>
              {children}
            </PrimeReactDialog.Content>
          </PrimeReactDialog.Popup>
        </PrimeReactDialog.Positioner>
      </PrimeReactDialog.Portal>
    </PrimeReactDialog.Root>
  );
};
