import type { CompanyDto } from '@/shared/api/endpoints/company';

export class Company {
  id: number;
  guid: string;
  name: string;

  constructor(dto: CompanyDto) {
    this.id = Number(dto.Id);
    this.guid = dto.Guid;
    this.name = dto.Name;
  }
}
