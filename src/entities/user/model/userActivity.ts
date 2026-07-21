export type TUserActivityCode = 0 | 1;
export type TUserActivity =
  | 'Seller'
  | 'TechnicalSpecialist';

export const USER_ACTIVITIES = {
  Seller: 'Продавец',
  TechnicalSpecialist: 'Технический специалист',
} as const;
