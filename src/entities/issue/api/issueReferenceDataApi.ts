import type { IHttpApiClient } from '@/shared/api/httpClient';

import type { IssueReferenceData } from '../model/interface/issueReferenceData';
import type { IssueReferenceDataItem } from '../model/interface/issueReferenceDataItem';
import { adaptIssueReferenceDataItemDto } from './adaptIssueReferenceDataItemDto';
import type { IssueReferenceDataDto } from './dto';

export interface IIssueReferenceDataApi {
  getProducts(): Promise<IssueReferenceDataItem[]>;
  getCategories(): Promise<IssueReferenceDataItem[]>;
  getOsTypes(): Promise<IssueReferenceDataItem[]>;
  getReferenceData(): Promise<IssueReferenceData>;
}

export class IssueReferenceDataApi implements IIssueReferenceDataApi {
  constructor(private readonly httpApiClient: IHttpApiClient) {}

  private async getItems(url: string): Promise<IssueReferenceDataItem[]> {
    const response = await this.httpApiClient.get<IssueReferenceDataDto>(url);

    return response.Data.map(adaptIssueReferenceDataItemDto);
  }

  getProducts(): Promise<IssueReferenceDataItem[]> {
    return this.getItems('/api/issues/reference-data/products');
  }

  getCategories(): Promise<IssueReferenceDataItem[]> {
    return this.getItems('/api/issues/reference-data/categories');
  }

  getOsTypes(): Promise<IssueReferenceDataItem[]> {
    return this.getItems('/api/issues/reference-data/os-types');
  }

  async getReferenceData(): Promise<IssueReferenceData> {
    const [products, categories, osTypes] = await Promise.all([
      this.getProducts(),
      this.getCategories(),
      this.getOsTypes(),
    ]);

    return {
      products,
      categories,
      osTypes,
    };
  }
}