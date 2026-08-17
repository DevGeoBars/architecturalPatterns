import { createContext } from 'react';
import type { DependencyContainer } from 'tsyringe';

export const DIContext =
  createContext<DependencyContainer | null>(null);
