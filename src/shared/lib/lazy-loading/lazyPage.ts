import { lazy, type ComponentType } from 'react';

/**
 * Создает ленивый компонент из именованного экспорта публичного API страницы
 * @param importFn - функция динамического импорта модуля
 * @param exportName - имя экспортируемого компонента
 */
export function lazyPage<T extends ComponentType<T>>(
    importFn: () => Promise<Record<string, T>>,
    exportName: string
) {
    return lazy(() =>
        importFn().then(module => ({
            default: module[exportName],
        }))
    );
}