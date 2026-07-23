export interface Responsible {
  id: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
}

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
