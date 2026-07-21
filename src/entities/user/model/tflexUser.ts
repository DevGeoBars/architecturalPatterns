import type { TFLEXUserDto } from '@/shared/api/endpoints/user';

export class TFLEXUser {
  id: number;
  guid: string;
  name: string;

  constructor(dto: TFLEXUserDto) {
    this.id = Number(dto.Id);
    this.guid = dto.Guid;
    this.name = dto.Name;
  }
}
