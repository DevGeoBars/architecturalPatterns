import type { TFLEXUserDto } from "./dto";

export interface TFLEXUser {
  id: string;
  guid: string;
  name: string;
}

export const mapTFlexUser = (dto: TFLEXUserDto): TFLEXUser => {
  return {
    guid: dto.Guid,
    name: dto.Name,
    id: dto.Id
  }
}
