import { useMemo } from 'react';

import type {
  InjectionToken,
} from 'tsyringe';

import { useRootContainer } from './useRootContainer';

export const useRootService = <T>(
  token: InjectionToken<T>,
): T => {
  const container = useRootContainer();

  return useMemo(
    () => container.resolve<T>(token),
    [container, token],
  );
};
