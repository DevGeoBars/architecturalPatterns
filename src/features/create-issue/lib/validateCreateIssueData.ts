import type {
  CreateIssueData,
} from '@/entities/issue';

export const validateCreateIssueData = (
  data: CreateIssueData,
): string | null => {
  if (data.subject === '') {
    return 'Укажите тему обращения';
  }

  if (data.content === '') {
    return 'Укажите описание обращения';
  }

  if (data.category === '') {
    return 'Укажите категорию обращения';
  }

  return null;
};
