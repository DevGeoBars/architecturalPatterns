import type {
  Claim,
  PriceListItem,
  StopListPosition,
} from '../model/claim';

import {
  CLAIM_STATES,
  type TClaimState,
  type TClaimStateCode,
} from '../model/claimState';

import {
  PURCHASE_FORMATS,
  type TPurchaseFormat,
  type TPurchaseFormatCode,
} from '../model/purchaseFormat';

import type {
  ClaimDto,
  PriceListItemDto,
  StopListDto,
} from './dto';

const adaptDate = (
  value:
    | string
    | null
    | undefined,
): Date | undefined => {
  const normalizedValue =
    value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const date =
    new Date(normalizedValue);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    throw new Error(
      `Некорректная дата заявки: ${value}`,
    );
  }

  return date;
};

const adaptClaimState = (
  stateCode: number,
): TClaimState => {
  const state =
    CLAIM_STATES[
      stateCode as TClaimStateCode
      ];

  if (state === undefined) {
    throw new Error(
      `Неизвестный статус заявки: ${stateCode}`,
    );
  }

  return state;
};

const adaptPurchaseFormat = (
  formatCode: number,
): TPurchaseFormat => {
  const format =
    PURCHASE_FORMATS[
      formatCode as TPurchaseFormatCode
      ];

  if (format === undefined) {
    throw new Error(
      `Неизвестный формат закупки: ${formatCode}`,
    );
  }

  return format;
};

const adaptStopListDto = (
  dto: StopListDto,
): StopListPosition => {
  return {
    guid: dto.Guid,

    prolongationDate:
      dto.ProlongationDate ===
      null
        ? null
        : adaptDate(
          dto.ProlongationDate,
        ),
  };
};

const adaptPriceListItemDto = (
  dto: PriceListItemDto,
): PriceListItem => {
  return {
    id: dto.Id,

    count: dto.Count,

    name: dto.Name,

    cost: dto.Cost,
  };
};

export const adaptClaimDto = (
  dto: ClaimDto,
): Claim => {
  return {
    id: dto.ID,

    inn: dto.INN,

    organizationName:
    dto.OrganizationName,

    organizationNameForDocuments:
    dto.OrganizationNameForDocments,

    country: {
      name:
      dto.CountryLink.Name,
    },

    city: {
      id: dto.CityLink.Id,

      name:
      dto.CityLink.Name,
    },

    organizationOwnerName:
    dto.OrganizationOwnerName,

    holdingName:
    dto.HoldingName,

    addressName:
    dto.AddressName,

    amountForSoftware:
    dto.AmountForSoftware,

    postCode:
    dto.PostCode,

    probability:
    dto.Probability,

    streetHouse1:
    dto.StreetHouse1,

    streetHouse2:
    dto.StreetHouse2,

    legalAddressCore:
    dto.LegalAddressCore,

    site: dto.Site,

    contactFullName:
    dto.ContactFullName,

    companyContactPosition:
    dto.CompanyContactPosition,

    implementationPeriod:
      adaptDate(
        dto.ImplementationPeriod,
      ),

    softwareConfiguration:
    dto.Komplektnost_PO,

    purchaseFormatCode:
      dto.PO_PurchaseFormat as
        TPurchaseFormatCode,

    purchaseFormat:
      adaptPurchaseFormat(
        dto.PO_PurchaseFormat,
      ),

    situationDescription:
    dto.SituationDescription,

    stateCode:
      dto.ClaimsState as
        TClaimStateCode,

    state:
      adaptClaimState(
        dto.ClaimsState,
      ),

    reviewDate:
      adaptDate(
        dto.ReviewDate,
      ),

    stopListPosition:
      adaptStopListDto(
        dto.StopListPosition,
      ),

    priceListItems:
      dto.PriceListItems.map(
        adaptPriceListItemDto,
      ),

    totalCost:
    dto.TotalCost,

    discountTotalCost:
    dto.DiscountTotalCost,
  };
};
