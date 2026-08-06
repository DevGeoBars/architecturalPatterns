import type {
  TClaimState,
  TClaimStateCode,
} from './claimState';

import type {
  TPurchaseFormat,
  TPurchaseFormatCode,
} from './purchaseFormat';

export interface Country {
  name: string;
}

export interface City {
  id: number;

  name: string;
}

export interface StopListPosition {
  guid: string;

  prolongationDate?:
    Date | null;
}

export interface PriceListItem {
  id: number;

  count: number;

  name: string;

  cost: number;
}

export interface Claim {
  id: number;

  inn: string;

  organizationName: string;

  organizationNameForDocuments:
    string;

  country: Country;

  city: City;

  organizationOwnerName: string;

  holdingName: string;

  addressName: string;

  amountForSoftware: number;

  postCode: number;

  probability: number;

  streetHouse1: string;

  streetHouse2: string;

  legalAddressCore: string;

  site: string;

  contactFullName: string;

  companyContactPosition:
    string;

  implementationPeriod?: Date;

  softwareConfiguration: string;

  purchaseFormatCode:
    TPurchaseFormatCode;

  purchaseFormat:
    TPurchaseFormat;

  situationDescription: string;

  stateCode: TClaimStateCode;

  state: TClaimState;

  reviewDate?: Date;

  stopListPosition:
    StopListPosition;

  priceListItems:
    PriceListItem[];

  totalCost?: number;

  discountTotalCost?: number;
}
