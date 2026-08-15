import type { Claim, PriceListItem, StopListPosition } from '../../../model/claim';
import {
  CLAIM_STATES,
  PURCHASE_FORMATS,
  isClaimStateCode,
  isPurchaseFormatCode,
  type TClaimState,
  type TClaimStateCode,
  type TPurchaseFormat,
  type TPurchaseFormatCode,
} from '../../../model/claim';

import type { ClaimDto, PriceListItemDto, StopListDto } from '../dto';

const adaptDate = (value: string | null | undefined): Date | undefined => {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Некорректная дата заявки: ${value}`);
  }

  return date;
};

const adaptClaimStateCode = (stateCode: number): TClaimStateCode => {
  if (!isClaimStateCode(stateCode)) {
    throw new Error(`Неизвестный статус заявки: ${stateCode}`);
  }

  return stateCode;
};

const adaptClaimState = (stateCode: number): TClaimState => {
  return CLAIM_STATES[adaptClaimStateCode(stateCode)];
};

const adaptPurchaseFormatCode = (formatCode: number): TPurchaseFormatCode => {
  if (!isPurchaseFormatCode(formatCode)) {
    throw new Error(`Неизвестный формат закупки: ${formatCode}`);
  }

  return formatCode;
};

const adaptPurchaseFormat = (formatCode: number): TPurchaseFormat => {
  return PURCHASE_FORMATS[adaptPurchaseFormatCode(formatCode)];
};

const adaptStopListDto = (dto: StopListDto): StopListPosition => ({
  guid: dto.Guid,
  prolongationDate: dto.ProlongationDate === null ? null : adaptDate(dto.ProlongationDate),
});

const adaptPriceListItemDto = (dto: PriceListItemDto): PriceListItem => ({
  id: dto.Id,
  count: dto.Count,
  name: dto.Name,
  cost: dto.Cost,
});

export const adaptClaimDto = (dto: ClaimDto): Claim => ({
  id: dto.ID,
  inn: dto.INN,
  organizationName: dto.OrganizationName,
  organizationNameForDocuments: dto.OrganizationNameForDocments,
  country: { name: dto.CountryLink.Name },
  city: { id: dto.CityLink.Id, name: dto.CityLink.Name },
  organizationOwnerName: dto.OrganizationOwnerName,
  holdingName: dto.HoldingName,
  addressName: dto.AddressName,
  amountForSoftware: dto.AmountForSoftware,
  postCode: dto.PostCode,
  probability: dto.Probability,
  streetHouse1: dto.StreetHouse1,
  streetHouse2: dto.StreetHouse2,
  legalAddressCore: dto.LegalAddressCore,
  site: dto.Site,
  contactFullName: dto.ContactFullName,
  companyContactPosition: dto.CompanyContactPosition,
  implementationPeriod: adaptDate(dto.ImplementationPeriod),
  softwareConfiguration: dto.Komplektnost_PO,
  purchaseFormatCode: adaptPurchaseFormatCode(dto.PO_PurchaseFormat),
  purchaseFormat: adaptPurchaseFormat(dto.PO_PurchaseFormat),
  situationDescription: dto.SituationDescription,
  stateCode: adaptClaimStateCode(dto.ClaimsState),
  state: adaptClaimState(dto.ClaimsState),
  reviewDate: adaptDate(dto.ReviewDate),
  stopListPosition: adaptStopListDto(dto.StopListPosition),
  priceListItems: dto.PriceListItems.map(adaptPriceListItemDto),
  totalCost: dto.TotalCost,
  discountTotalCost: dto.DiscountTotalCost,
});
