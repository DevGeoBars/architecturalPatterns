import { APP_ROUTES } from '@/shared/routes';

import type { INavigationItem } from '../model/navigation';

export const NAVIGATION_CONFIG = {
  customer: [
    {
      text: 'Заявки',
      path: APP_ROUTES.CLAIMS,
      icon: 'pi pi-check',
    },
  ],

  nonCustomer: [
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
} satisfies Record<
  'customer' | 'nonCustomer',
  INavigationItem[]
>;