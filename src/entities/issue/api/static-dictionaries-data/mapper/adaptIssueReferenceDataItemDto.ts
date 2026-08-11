import type { IssueReferenceDataItem } from '../../../model/static-dictionaries-data/types/issueReferenceDataItem';
import type { IssueReferenceDataItemDto } from '../../issue/dto';

export const adaptIssueReferenceDataItemDto = (
  dto: IssueReferenceDataItemDto,
): IssueReferenceDataItem => ({
  id: Number(dto.Id),
  name: dto.Name,
  icon: dto.Icon,
});