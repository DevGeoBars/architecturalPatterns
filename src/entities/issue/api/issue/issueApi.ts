import type { IHttpApiClient } from '@/shared/api';

import type { IssueDto, IssueListDto, UpdateIssueCommentsDto } from './dto';

import type { CreateCommentData } from '../../model/issue/types/createCommentData';
import type { CreateIssueData } from '../../model/issue/types/createIssueData';
import type { Issue } from '../../model/issue/types/issue';
import type { UpdateIssueData } from '../../model/issue/types/updateIssueData';

import { adaptCommentToDto } from './mapper/adaptCommentToDto';
import { adaptCreateCommentDataToDto } from './mapper/adaptCreateCommentDataToDto';
import { adaptCreateIssueDataToDto } from './mapper/adaptCreateIssueDataToDto';
import { adaptUpdateIssueDataToDto } from './mapper/adaptUpdateIssueDataToDto';
import { adaptIssueDto } from './mapper/adaptIssueDto';

import { getNextCommentId } from './getNextCommentId';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isAttachedFileDto = (value: unknown): boolean =>
  isRecord(value) && typeof value.Id === 'number' && typeof value.Name === 'string';

const isCommentDto = (value: unknown): boolean =>
  isRecord(value) && (typeof value.Id === 'number' || typeof value.Id === 'string') &&
  typeof value.CreatedAt === 'string' && typeof value.Content === 'string' &&
  typeof value.AuthorId === 'string' && typeof value.AuthorName === 'string' &&
  typeof value.IsForUser === 'boolean' && Array.isArray(value.Files) &&
  value.Files.every(isAttachedFileDto);

const isOptionalArray = (
  value: unknown,
  itemGuard: (item: unknown) => boolean,
): boolean => value === undefined || (Array.isArray(value) && value.every(itemGuard));

const isIssueDto = (value: unknown): value is IssueDto => {
  return isRecord(value) &&
    typeof value.Id === 'string' &&
    typeof value.Number === 'string' &&
    typeof value.Status === 'number' &&
    typeof value.UserStatus === 'number' &&
    isOptionalArray(value.Files, isAttachedFileDto) &&
    isOptionalArray(value.Comments, isCommentDto) &&
    isOptionalArray(value.RelatedIssues, isIssueDto) &&
    isOptionalArray(value.RelatedSuggestions, (item) =>
      isRecord(item) && (typeof item.Id === 'number' || typeof item.Id === 'string') &&
      (typeof item.Number === 'number' || typeof item.Number === 'string') &&
      typeof item.Subject === 'string') &&
    (value.Labels === null || isOptionalArray(value.Labels, (item) =>
      isRecord(item) && typeof item.Id === 'number' && typeof item.Name === 'string' &&
      typeof item.Color === 'string' && (item.Message === null || typeof item.Message === 'string') &&
      typeof item.OwnerId === 'number' && typeof item.StatusCode === 'number'));
};

const parseIssueDto = (value: unknown): IssueDto => {
  if (!isIssueDto(value)) {
    throw new Error('Сервер вернул некорректное обращение');
  }

  return value;
};

const parseIssueListDto = (value: unknown): IssueListDto => {
  if (!isRecord(value) || !Array.isArray(value.Data) || typeof value.TotalCount !== 'number') {
    throw new Error('Сервер вернул некорректный список обращений');
  }

  if (!value.Data.every(isIssueDto)) {
    throw new Error('Список обращений содержит некорректные данные');
  }

  return { Data: value.Data, TotalCount: value.TotalCount };
};

export interface IIssueApi {
  getIssues(): Promise<Issue[]>;
  getIssue(issueId: number): Promise<Issue>;
  createIssue(data: CreateIssueData): Promise<Issue>;
  updateIssue(issueId: number, data: UpdateIssueData): Promise<Issue>;
  addComment(issue: Issue, data: CreateCommentData): Promise<Issue>;
}

export class IssueApi implements IIssueApi {
  constructor(readonly httpApiClient: IHttpApiClient) {}

  async getIssues(): Promise<Issue[]> {
    const response = parseIssueListDto(await this.httpApiClient.get('/api/issues'));

    return response.Data.map(adaptIssueDto);
  }

  async getIssue(issueId: number): Promise<Issue> {
    const dto = parseIssueDto(await this.httpApiClient.get(`/api/issues/${issueId}`));

    return adaptIssueDto(dto);
  }

  async createIssue(data: CreateIssueData): Promise<Issue> {
    const dto = parseIssueDto(await this.httpApiClient.post(
      '/api/issues',
      adaptCreateIssueDataToDto(data),
    ));

    return adaptIssueDto(dto);
  }

  async updateIssue(issueId: number, data: UpdateIssueData): Promise<Issue> {
    const dto = parseIssueDto(await this.httpApiClient.patch(
      `/api/issues/${issueId}`,
      adaptUpdateIssueDataToDto(data),
    ));

    return adaptIssueDto(dto);
  }

  async addComment(issue: Issue, data: CreateCommentData): Promise<Issue> {
    const currentComments = issue.comments.map(adaptCommentToDto);

    const newComment = adaptCreateCommentDataToDto(
      data,
      getNextCommentId(issue.comments),
    );

    const payload: UpdateIssueCommentsDto = {
      Comments: [...currentComments, newComment],
    };

    const dto = parseIssueDto(await this.httpApiClient.patch(
      `/api/issues/${issue.id}`,
      payload,
    ));

    return adaptIssueDto(dto);
  }
}
