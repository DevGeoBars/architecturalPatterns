import { createContext } from 'react';
import type { DependencyContainer } from 'tsyringe';

export const RootDIContext =
  createContext<DependencyContainer | null>(
    null,
  );
