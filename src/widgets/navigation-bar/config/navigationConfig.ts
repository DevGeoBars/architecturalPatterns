import { APP_ROUTES } from '@/shared/routes';

import type { INavigationItem } from '../model/navigation';


export const NAVIGATION_CONFIG = {
  admin: [
    {
      text: 'Обращения',
      path: APP_ROUTES.ISSUES,
      icon: 'pi pi-inbox',
    },
    {
      text: 'Действия',
      path: APP_ROUTES.ACTIONS,
      icon: 'pi pi-book',
    },
  ],

  seller: [
    {
      text: 'Заявки',
      path: APP_ROUTES.CLAIMS,
      icon: 'pi pi-check',
    },
    {
      text: 'Маркетинговые материалы',
      path: '/marketingMaterials',
      icon: 'pi pi-check',
    },
    {
      text: 'Документы и обучающие материалы',
      path: '/marketingDocuments',
      icon: 'pi pi-check',
    },
  ],
} satisfies Record<
  'admin' | 'seller',
  INavigationItem[]
>;
