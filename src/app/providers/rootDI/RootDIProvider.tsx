import type { PropsWithChildren } from 'react';
import type { DependencyContainer } from 'tsyringe';

import { RootDIContext } from './rootDIContext';

type TRootDIProviderProps = PropsWithChildren<{
  container: DependencyContainer;
}>;

export const RootDIProvider = ({
  children,
  container,
}: TRootDIProviderProps) => {
  return (
    <RootDIContext.Provider value={container}>
      {children}
    </RootDIContext.Provider>
  );
};
