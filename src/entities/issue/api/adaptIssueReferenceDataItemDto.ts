import type { IssueReferenceDataItem } from '../model/interface/issueReferenceDataItem';
import type { IssueReferenceDataItemDto } from './dto';

export const adaptIssueReferenceDataItemDto = (
  dto: IssueReferenceDataItemDto,
): IssueReferenceDataItem => ({
  id: Number(dto.Id),
  name: dto.Name,
  icon: dto.Icon,
});