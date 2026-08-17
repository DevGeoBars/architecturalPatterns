import type { IssueStaticDictionaryItem } from '../../../model/issue-static-dictionaries';
import type { IssueStaticDictionaryItemDto } from '../dto';

export const adaptIssueStaticDictionaryItemDto = (
  dto: IssueStaticDictionaryItemDto,
): IssueStaticDictionaryItem => ({
  id: Number(dto.Id),
  name: dto.Name,
  icon: dto.Icon,
});
