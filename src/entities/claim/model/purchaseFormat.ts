export const PURCHASE_FORMATS = {
  0: 'Прямая продажа',

  1: 'Внутренний конкурс',

  2: 'Электронная площадка',
} as const;

export type TPurchaseFormatCode =
  keyof typeof PURCHASE_FORMATS;

export type TPurchaseFormat =
  (typeof PURCHASE_FORMATS)[
    TPurchaseFormatCode
    ];

export const isPurchaseFormatCode = (value: number): value is TPurchaseFormatCode => {
  return value in PURCHASE_FORMATS;
};
