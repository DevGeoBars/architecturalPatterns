import type { TFLEXUser } from '../../../model/user';
import type { TFLEXUserDto } from '../dto';

export const adaptTFlexUserDto = (dto: TFLEXUserDto): TFLEXUser => ({
  id: dto.Id,
  guid: dto.Guid,
  name: dto.Name,
});
