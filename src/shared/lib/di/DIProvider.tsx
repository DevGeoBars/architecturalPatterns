import type { PropsWithChildren } from "react";
import type { DependencyContainer } from 'tsyringe';

import { DIContext } from './DIContext';


interface IDIProviderProps extends PropsWithChildren {
  container: DependencyContainer;
}

export const DIProvider = ({
  container,
  children,
}: IDIProviderProps) => {
  return (
    <DIContext.Provider value={container}>
      {children}
    </DIContext.Provider>
  );
};
