import type { Company } from '../../../model/user';
import type { CompanyDto } from '../dto';

export const adaptCompanyDto = (dto: CompanyDto): Company => ({
  id: dto.Id,
  guid: dto.Guid,
  name: dto.Name,
});
