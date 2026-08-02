import type {
  IHttpApiClient,
} from '@/shared/api/httpClient';

import type {
  IssueDto,
  IssueListDto,
} from './dto';
import { adaptIssueDto } from './mapper';

import type { Issue } from '../model/interface/issue';
import type { CreateIssueData } from "../model/interface/createIssueData";
import { adaptCreateIssueDataToDto } from "@/entities/issue/api/adaptCreateIssueDataToDto";




export interface IIssueApi {
  getIssues(): Promise<Issue[]>;
  getIssue(issueId: number): Promise<Issue>;

  createIssue(
    data: CreateIssueData
  ): Promise<Issue>;
}

export class IssueApi implements IIssueApi {
  constructor(
    readonly httpApiClient: IHttpApiClient
  ) {}

  async getIssues(): Promise<Issue[]> {
    const response =
      await this.httpApiClient.get<IssueListDto>(
        '/api/issues',
      );

    return response.Data.map(adaptIssueDto);
  }

  async getIssue(
    issueId: number,
  ): Promise<Issue> {
    const dto =
      await this.httpApiClient.get<IssueDto>(
        `/api/issues/${issueId}`,
      );

    return adaptIssueDto(dto);
  }

  async createIssue(
    data: CreateIssueData,
  ): Promise<Issue> {
    const dto =
      await this.httpApiClient.post<IssueDto>(
        '/api/issues',
        adaptCreateIssueDataToDto(data),
      );

    return adaptIssueDto(dto);
  }
}
