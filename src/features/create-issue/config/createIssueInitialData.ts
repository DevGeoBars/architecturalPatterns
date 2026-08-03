import type {
  CreateIssueData,
} from '@/entities/issue';

export const createIssueInitialData =
  (): CreateIssueData => {
    return {
      subject: '',
      content: '',

      category:
        'Запрос информации',

      statusCode: 0,
      userStatusCode: 0,

      isDemonstrated: false,
    };
  };
