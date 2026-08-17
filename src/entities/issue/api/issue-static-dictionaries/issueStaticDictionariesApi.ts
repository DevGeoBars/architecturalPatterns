import type { IHttpApiClient } from '@/shared/api';

import type {
  IssueStaticDictionaries,
  IssueStaticDictionaryItem,
} from '../../model/issue-static-dictionaries';
import { adaptIssueStaticDictionaryItemDto } from './mapper/adaptIssueStaticDictionaryItemDto';
import type { IssueStaticDictionariesDto } from './dto';

const isIssueStaticDictionariesDto = (
  value: unknown,
): value is IssueStaticDictionariesDto => {
  if (typeof value !== 'object' || value === null || !('Data' in value) || !Array.isArray(value.Data)) {
    return false;
  }

  return value.Data.every((item) => {
    return typeof item === 'object' && item !== null &&
      'Id' in item && typeof item.Id === 'number' &&
      'Name' in item && typeof item.Name === 'string' &&
      'Icon' in item && (typeof item.Icon === 'string' || item.Icon === null);
  });
};

export interface IIssueStaticDictionariesApi {
  getProducts(): Promise<IssueStaticDictionaryItem[]>;
  getCategories(): Promise<IssueStaticDictionaryItem[]>;
  getOsTypes(): Promise<IssueStaticDictionaryItem[]>;
  getDictionaries(): Promise<IssueStaticDictionaries>;
}

export class IssueStaticDictionariesApi implements IIssueStaticDictionariesApi {
  constructor(private readonly httpApiClient: IHttpApiClient) {}

  private async getItems(url: string): Promise<IssueStaticDictionaryItem[]> {
    const response = await this.httpApiClient.get(url);

    if (!isIssueStaticDictionariesDto(response)) {
      throw new Error('Сервер вернул некорректные справочные данные');
    }

    return response.Data.map(adaptIssueStaticDictionaryItemDto);
  }

  getProducts(): Promise<IssueStaticDictionaryItem[]> {
    return this.getItems('/api/issues/reference-data/products');
  }

  getCategories(): Promise<IssueStaticDictionaryItem[]> {
    return this.getItems('/api/issues/reference-data/categories');
  }

  getOsTypes(): Promise<IssueStaticDictionaryItem[]> {
    return this.getItems('/api/issues/reference-data/os-types');
  }

  async getDictionaries(): Promise<IssueStaticDictionaries> {
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
