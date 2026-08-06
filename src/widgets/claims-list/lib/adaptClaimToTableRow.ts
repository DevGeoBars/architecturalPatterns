import type {
  Claim,
} from '@/entities/claim';

import type {
  ClaimTableRow,
} from '../model/claimTableRow';

const dateFormatter =
  new Intl.DateTimeFormat(
    'ru-RU',
    {
      day: '2-digit',

      month: '2-digit',

      year: 'numeric',
    },
  );

const numberFormatter =
  new Intl.NumberFormat(
    'ru-RU',
    {
      maximumFractionDigits: 2,
    },
  );

const getTextValue = (
  value: string,
): string => {
  const normalizedValue =
    value.trim();

  return normalizedValue || '—';
};

const getLocation = (
  claim: Claim,
): string => {
  const locationParts = [
    claim.country.name.trim(),

    claim.city.name.trim(),
  ].filter(Boolean);

  return locationParts.length > 0
    ? locationParts.join(', ')
    : '—';
};

const getContact = (
  claim: Claim,
): string => {
  const contactParts = [
    claim.contactFullName.trim(),

    claim.companyContactPosition.trim(),
  ].filter(Boolean);

  return contactParts.length > 0
    ? contactParts.join(' — ')
    : '—';
};

export const adaptClaimToTableRow = (
  claim: Claim,
): ClaimTableRow => {
  return {
    id: claim.id,

    organizationName:
      getTextValue(
        claim.organizationName,
      ),

    inn:
      getTextValue(
        claim.inn,
      ),

    location:
      getLocation(claim),

    contact:
      getContact(claim),

    state: claim.state,

    probability:
      numberFormatter.format(
        claim.probability,
      ),

    implementationPeriod:
      claim.implementationPeriod
        ? dateFormatter.format(
          claim.implementationPeriod,
        )
        : '—',

    totalCost:
      claim.totalCost ===
      undefined
        ? '—'
        : numberFormatter.format(
          claim.totalCost,
        ),
  };
};

export const adaptClaimsToTableRows = (
  claims: Claim[],
): ClaimTableRow[] => {
  return claims.map(
    adaptClaimToTableRow,
  );
};
