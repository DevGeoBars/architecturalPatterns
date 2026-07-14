// DTO
export interface TFLEXUserDto {
  Id: string;
  Guid: string;
  Name: string;
  Company?: string | null;
}

// Доменная модель
export interface TFLEXUser {
  id: number;
  guid: string;
  name: string;
}

// Маппер
export function tflexUserMapper(dto: TFLEXUserDto): TFLEXUser {
  return {
    id: parseInt(dto.Id, 10),
    guid: dto.Guid,
    name: dto.Name,
  };
}