import type {
  InjectionToken,
} from 'tsyringe';

import { useDIContainer } from './useDIContainer';

export const useService = <T>(
  token: InjectionToken<T>,
): T => {
  const container = useDIContainer();

  return container.resolve<T>(token);
};
