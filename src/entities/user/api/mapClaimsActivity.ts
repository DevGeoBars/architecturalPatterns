import type { ClaimsActivityDto } from "./dto/claimsActivity";
import type { TUserActivity } from "../model/userActivity";

const USER_ACTIVITY_MAP: Record<number, TUserActivity> = {
  0: 'TechnicalSpecialist',
  1: 'Seller',
};

export const mapClaimsActivity = (
  claimsActivity: ClaimsActivityDto,
): TUserActivity => {
  return USER_ACTIVITY_MAP[claimsActivity];
};

//https://feature-sliced.design/ru/docs/guides/examples/types#%D0%BA%D1%83%D0%B4%D0%B0-%D0%BF%D0%BE%D0%BB%D0%BE%D0%B6%D0%B8%D1%82%D1%8C-%D0%BC%D0%B0%D0%BF%D0%BF%D0%B5%D1%80%D1%8B
