import type {
  CreateIssueData,
} from '@/entities/issue';

export const CREATE_ISSUE_FIXTURE = {
  subject: 'Тестовое обращение',
  content:
    'Тестовое обращение, созданное кнопкой create-issue.',

  category: 'Запрос информации',
  statusCode: 0,
  userStatusCode: 0,

  severity: 'Средняя',
  product: 'ServiceDesk',
  version: '1.0',
  os: 'Windows',
  type: 'Тест',

  customerOrganizationName:
    'Тестовая организация',

  isDemonstrated: false,
} satisfies CreateIssueData;
