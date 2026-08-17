import type { Responsible } from '../types/responsible';

export const getResponsibleFullName = (
  responsible: Responsible,
): string => {
  return [
    responsible.lastName,
    responsible.firstName,
    responsible.fatherName,
  ]
    .filter(Boolean)
    .join(' ');
};
