// DTO
export interface CompanyDto {
  Id: number;
  Name: string;
  Guid: string;
}

// Доменная модель
export interface Company {
  id: number;
  name: string;
  guid: string;
}

// Маппер
export function companyMapper(dto: CompanyDto): Company {
  return {
    id: dto.Id,
    name: dto.Name,
    guid: dto.Guid,
  };
}