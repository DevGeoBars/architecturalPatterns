// shared/validation/lazy-loading/lazyPage.tsx

import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';

type TModule<TProps> = Record<
  string,
  ComponentType<TProps>
>;

export const lazyPage = <
  TProps extends object = Record<string, never>,
>(
  factory: () => Promise<TModule<TProps>>,
  exportName: string,
): ComponentType<TProps> => {
  const LazyComponent: LazyExoticComponent<
    ComponentType<TProps>
  > = lazy(async () => {
    const module = await factory();
    const component = module[exportName];

    if (!component) {
      throw new Error(
        `Export "${exportName}" was not found`,
      );
    }

    return {
      default: component,
    };
  });

  return function LazyPage(props: TProps) {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};
