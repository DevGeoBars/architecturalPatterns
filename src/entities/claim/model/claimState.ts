export const CLAIM_STATES = {
  0: 'Новая',

  1: 'Обрабатывается',

  2: 'Одобрена',

  3: 'Отклонена',

  4: 'Обрабатывается (обновлена)',
} as const;

export type TClaimStateCode =
  keyof typeof CLAIM_STATES;

export type TClaimState =
  (typeof CLAIM_STATES)[
    TClaimStateCode
    ];

export const isClaimStateCode = (value: number): value is TClaimStateCode => {
  return value in CLAIM_STATES;
};
