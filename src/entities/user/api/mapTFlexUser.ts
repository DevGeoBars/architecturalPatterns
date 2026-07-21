import type { TFLEXUserDto } from "./dto";
import type { TFLEXUser } from "../model/tflexUser";



export const mapTFlexUser = (dto: TFLEXUserDto): TFLEXUser => {
  return {
    guid: dto.Guid,
    name: dto.Name,
    id: dto.Id
  }
}
