import type { UpdateIssueData } from '@/entities/issue';

export const validateEditIssueData = (
  data: UpdateIssueData,
): string | null => {
  if (data.subject === '') {
    return 'Поле «Тема» обязательно';
  }

  if (data.content === '') {
    return 'Поле «Описание» обязательно';
  }

  if (data.category === '') {
    return 'Поле «Категория» обязательно';
  }

  return null;
};
