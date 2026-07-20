import type { TUserActivity, TUserActivityCode } from "../model/userActivity";



const USER_ACTIVITY_MAP: Record<number, TUserActivity> = {
  0: 'TechnicalSpecialist',
  1: 'Seller',
};

export const mapUserActivity = (
  claimsActivity: TUserActivityCode,
): TUserActivity => {
  return USER_ACTIVITY_MAP[claimsActivity];
};
