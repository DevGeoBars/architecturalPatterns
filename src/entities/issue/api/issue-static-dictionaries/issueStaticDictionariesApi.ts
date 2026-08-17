import type { IHttpApiClient } from '@/shared/api';

import type {
  IssueStaticDictionaries,
  IssueStaticDictionaryItem,
} from '../../model/issue-static-dictionaries';
import { adaptIssueStaticDictionaryItemDto } from './mapper/adaptIssueStaticDictionaryItemDto';
import { isIssueStaticDictionariesDto } from './dto/isIssueStaticDictionariesDto';

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
