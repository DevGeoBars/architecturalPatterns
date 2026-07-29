import { APP_ROUTES } from '@/shared/routes';

import type { INavigationItem } from '../model/navigation';


export const NAVIGATION_CONFIG = {
  admin: [
    { text: 'Обращения', path: APP_ROUTES.ISSUES, icon: 'pi pi-inbox'},
    { text: 'Действия', path: '/actions', icon: 'pi pi-book' },
  ] as INavigationItem[],
  seller: [
    { text: 'Заявки', path: APP_ROUTES.CLAIMS, icon: 'pi pi-check' },
    { text: 'Маркетинговые материалы', path: '/marketingMaterials', icon: 'pi pi-check' },
    { text: 'Документы и обучающие материалы', path: '/marketingDocuments', icon: 'pi pi-check' },
  ] as INavigationItem[],
};
