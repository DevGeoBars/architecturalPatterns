import type { ResponsibleDto } from '@/shared/api/endpoints/issue';

export class Responsible {
  id: number;

  firstName: string;

  lastName: string;

  fatherName: string;

  email: string;

  constructor(dto: ResponsibleDto) {
    this.id = dto.Id;
    this.firstName = dto.FirstName;
    this.lastName = dto.LastName;
    this.fatherName = dto.FatherName;
    this.email = dto.Email;
  }

  get fullName(): string {
    return [
      this.lastName,
      this.firstName,
      this.fatherName,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
