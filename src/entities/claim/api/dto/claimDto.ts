export interface CountryDto {
  Name: string;
}

export interface CityDto {
  Name: string;
  Id: number;
}

export interface StopListDto {
  ProlongationDate?:
    string | null;

  Guid: string;
}

export interface PriceListItemDto {
  Id: number;
  Count: number;
  Name: string;
  Cost: number;
}

export interface ClaimRequestDto {
  INN: string;

  OrganizationName: string;

  OrganizationNameForDocments:
    string;

  CountryLink: CountryDto;

  CityLink: CityDto;

  OrganizationOwnerName: string;

  HoldingName: string;

  AddressName: string;

  AmountForSoftware: number;

  PostCode: number;

  Probability: number;

  StreetHouse1: string;

  StreetHouse2: string;

  LegalAddressCore: string;

  Site: string;

  ContactFullName: string;

  CompanyContactPosition:
    string;

  ImplementationPeriod: string;

  Komplektnost_PO: string;

  PO_PurchaseFormat: number;

  SituationDescription: string;

  ClaimsState: number;

  ReviewDate: string;

  StopListPosition:
    StopListDto;

  PriceListItems:
    PriceListItemDto[];

  TotalCost?: number;

  DiscountTotalCost?: number;
}

export interface ClaimDto
  extends ClaimRequestDto
{
  ID: number;
}

export interface ClaimsCollectionDto {
  Data: ClaimDto[];

  TotalCount: number;
}
