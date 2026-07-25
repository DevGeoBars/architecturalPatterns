import { useContext } from 'react';

import { DIContext } from './DIContext';

export const useDIContainer = () => {
  const container = useContext(DIContext);

  if (container === null) {
    throw new Error(
      'useDIContainer должен использоваться внутри DIProvider',
    );
  }

  return container;
};
