import type { DirectionDto } from '@/shared/api/endpoints/issue';

export interface Direction {
  id: number;
  name: string;
}

export const createDirection = (
  dto: DirectionDto,
): Direction => ({
  id: dto.Id,
  name: dto.Name,
});
