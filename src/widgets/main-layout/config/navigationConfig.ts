import { APP_ROUTES } from '@/shared/routes';

import type { INavigationItem } from '../model/navigation';


export const NAVIGATION_CONFIG = {
  admin: [
    { text: 'Обращения', path: APP_ROUTES.ISSUES, icon: 'comment' },
    { text: 'Действия', path: '/actions', icon: 'fas fa-thumbs-up' },
  ] as INavigationItem[],
  seller: [
    { text: 'Заявки', path: APP_ROUTES.CLAIMS, icon: 'fas fa-headphones' },
    { text: 'Маркетинговые материалы', path: '/marketingMaterials', icon: 'marketingIcon' },
    { text: 'Документы и обучающие материалы', path: '/marketingDocuments', icon: 'marketingFolder' },
  ] as INavigationItem[],
};