import type { TFLEXUserDto } from "@/entities/user/api/dto";

export class TFLEXUser {
  id: string;
  guid: string;
  name: string;

  constructor(dto: TFLEXUserDto) {
    this.id = dto.Id;
    this.guid = dto.Guid;
    this.name = dto.Name;
  }
}
