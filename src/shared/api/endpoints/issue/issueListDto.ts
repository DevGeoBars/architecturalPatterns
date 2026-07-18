import type { IssueDto } from './issueDto';

export interface IssueListDto {
  Data: IssueDto[];

  TotalCount: number;
}
