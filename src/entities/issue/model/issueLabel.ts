import type { IssueLabelDto } from '@/shared/api/endpoints/issue';

export interface IssueLabel {
  id: number;
  name: string;
  color: string;
  message: string | null;
  ownerId: number;
  statusCode: number;
}

export const createIssueLabel = (
  dto: IssueLabelDto,
): IssueLabel => ({
  id: dto.Id,
  name: dto.Name,
  color: dto.Color,
  message: dto.Message,
  ownerId: dto.OwnerId,
  statusCode: dto.StatusCode,
});
