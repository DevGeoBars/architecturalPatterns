import { useContext } from 'react';

import { RootDIContext } from './rootDIContext';

export const useRootContainer = () => {
  const container =
    useContext(RootDIContext);

  if (!container) {
    throw new Error(
      'useRootContainer должен использоваться с RootDIProvider',
    );
  }

  return container;
};
