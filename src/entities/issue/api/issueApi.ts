import type {
  IHttpApiClient,
} from '@/shared/api/httpClient';

import type {
  CreateCommentData,
} from '../model/interface/createCommentData';

import type {
  CreateIssueData,
} from '../model/interface/createIssueData';

import type {
  Issue,
} from '../model/interface/issue';

import {
  adaptCommentToDto,
} from './adaptCommentToDto';

import {
  adaptCreateCommentDataToDto,
} from './adaptCreateCommentDataToDto';

import {
  adaptCreateIssueDataToDto,
} from './adaptCreateIssueDataToDto';

import type {
  IssueDto,
  IssueListDto,
  UpdateIssueCommentsDto,
} from './dto';

import {
  getNextCommentId,
} from './getNextCommentId';

import {
  adaptIssueDto,
} from './mapper';

export interface IIssueApi {
  getIssues(): Promise<
    Issue[]
  >;

  getIssue(
    issueId: number,
  ): Promise<Issue>;

  createIssue(
    data: CreateIssueData,
  ): Promise<Issue>;

  addComment(
    issue: Issue,

    data:
    CreateCommentData,
  ): Promise<Issue>;
}

export class IssueApi
  implements IIssueApi
{
  constructor(
    readonly httpApiClient:
    IHttpApiClient,
  ) {}

  async getIssues(): Promise<
    Issue[]
  > {
    const response =
      await this.httpApiClient.get<IssueListDto>(
        '/api/issues',
      );

    return response.Data.map(
      adaptIssueDto,
    );
  }

  async getIssue(
    issueId: number,
  ): Promise<Issue> {
    const dto =
      await this.httpApiClient.get<IssueDto>(
        `/api/issues/${issueId}`,
      );

    return adaptIssueDto(
      dto,
    );
  }

  async createIssue(
    data: CreateIssueData,
  ): Promise<Issue> {
    const dto =
      await this.httpApiClient.post<IssueDto>(
        '/api/issues',

        adaptCreateIssueDataToDto(
          data,
        ),
      );

    return adaptIssueDto(
      dto,
    );
  }

  async addComment(
    issue: Issue,

    data:
    CreateCommentData,
  ): Promise<Issue> {
    const currentComments =
      issue.comments.map(
        adaptCommentToDto,
      );

    const newComment =
      adaptCreateCommentDataToDto(
        data,

        getNextCommentId(
          issue.comments,
        ),
      );

    const payload:
      UpdateIssueCommentsDto = {
      Comments: [
        ...currentComments,

        newComment,
      ],
    };

    /**
     * Для feature это операция "добавить комментарий".
     *
     * То, что HTTP API реализует её как PATCH Issue
     * с новым полным списком Comments, остаётся
     * внутренней транспортной деталью entities/issue.
     */
    const dto =
      await this.httpApiClient.patch<IssueDto>(
        `/api/issues/${issue.id}`,

        payload,
      );

    return adaptIssueDto(
      dto,
    );
  }
}
