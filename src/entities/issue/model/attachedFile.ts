import type { AttachedFileDto } from '@/shared/api/endpoints/issue';

export interface AttachedFile {
  id: number;
  name: string;
}

export const createAttachedFile = (
  dto: AttachedFileDto,
): AttachedFile => ({
  id: dto.Id,
  name: dto.Name,
});
