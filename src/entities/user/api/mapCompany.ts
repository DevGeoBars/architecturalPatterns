import type { CompanyDto } from "./dto";

export interface Company {
  id: number;
  guid: string;
  name: string;
}

export const mapCompany = (dto: CompanyDto): Company => {
  return {
    guid: dto.Guid,
    name: dto.Name,
    id: dto.Id
  }
}
