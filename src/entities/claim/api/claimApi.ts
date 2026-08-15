import type {
  IHttpApiClient,
} from '@/shared/api/httpClient';

import type {
  Claim,
} from '../model/claim';

import {
  adaptClaimDto,
} from './adaptClaimDto';

import type {
  ClaimsCollectionDto,
} from './dto';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isClaimsCollectionDto = (value: unknown): value is ClaimsCollectionDto => {
  return isRecord(value) &&
    'TotalCount' in value && typeof value.TotalCount === 'number' &&
    'Data' in value && Array.isArray(value.Data) && value.Data.every(isClaimDto);
};

const isClaimDto = (value: unknown): boolean => {
  if (!isRecord(value)) {
    return false;
  }

  const stringFields = [
    'INN', 'OrganizationName', 'OrganizationNameForDocments',
    'OrganizationOwnerName', 'HoldingName', 'AddressName', 'StreetHouse1',
    'StreetHouse2', 'LegalAddressCore', 'Site', 'ContactFullName',
    'CompanyContactPosition', 'ImplementationPeriod', 'Komplektnost_PO',
    'SituationDescription', 'ReviewDate',
  ];
  const numberFields = [
    'ID', 'AmountForSoftware', 'PostCode', 'Probability',
    'PO_PurchaseFormat', 'ClaimsState',
  ];

  if (!stringFields.every((field) => field in value && typeof value[field] === 'string') ||
    !numberFields.every((field) => field in value && typeof value[field] === 'number')) {
    return false;
  }

  return 'CountryLink' in value && typeof value.CountryLink === 'object' &&
    value.CountryLink !== null && 'Name' in value.CountryLink &&
    typeof value.CountryLink.Name === 'string' &&
    'CityLink' in value && typeof value.CityLink === 'object' && value.CityLink !== null &&
    'Id' in value.CityLink && typeof value.CityLink.Id === 'number' &&
    'Name' in value.CityLink && typeof value.CityLink.Name === 'string' &&
    'StopListPosition' in value && typeof value.StopListPosition === 'object' &&
    value.StopListPosition !== null && 'Guid' in value.StopListPosition &&
    typeof value.StopListPosition.Guid === 'string' &&
    'PriceListItems' in value && Array.isArray(value.PriceListItems) &&
    value.PriceListItems.every((item) => typeof item === 'object' && item !== null &&
      'Id' in item && typeof item.Id === 'number' &&
      'Count' in item && typeof item.Count === 'number' &&
      'Name' in item && typeof item.Name === 'string' &&
      'Cost' in item && typeof item.Cost === 'number');
};

export interface IClaimApi {
  getClaims(): Promise<Claim[]>;
}

export class ClaimApi
  implements IClaimApi
{
  constructor(
    readonly httpApiClient:
    IHttpApiClient,
  ) {}

  async getClaims(): Promise<
    Claim[]
  > {
    const response =
      await this.httpApiClient.get(
        '/api/claims',
      );

    if (!isClaimsCollectionDto(response)) {
      throw new Error('Сервер вернул некорректный список заявок');
    }

    return response.Data.map(
      adaptClaimDto,
    );
  }
}
