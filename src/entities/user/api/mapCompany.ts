import type { CompanyDto } from "./dto";
import type { Company } from "../model/company";



export const mapCompany = (dto: CompanyDto): Company => {
  return {
    guid: dto.Guid,
    name: dto.Name,
    id: dto.Id
  }
}
