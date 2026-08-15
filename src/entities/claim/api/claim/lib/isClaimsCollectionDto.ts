import type { ClaimsCollectionDto } from '../dto';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

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

  return isRecord(value.CountryLink) && typeof value.CountryLink.Name === 'string' &&
    isRecord(value.CityLink) && typeof value.CityLink.Id === 'number' &&
    typeof value.CityLink.Name === 'string' &&
    isRecord(value.StopListPosition) && typeof value.StopListPosition.Guid === 'string' &&
    Array.isArray(value.PriceListItems) && value.PriceListItems.every((item) =>
      isRecord(item) && typeof item.Id === 'number' && typeof item.Count === 'number' &&
      typeof item.Name === 'string' && typeof item.Cost === 'number');
};

export const isClaimsCollectionDto = (value: unknown): value is ClaimsCollectionDto => {
  return isRecord(value) && typeof value.TotalCount === 'number' &&
    Array.isArray(value.Data) && value.Data.every(isClaimDto);
};
