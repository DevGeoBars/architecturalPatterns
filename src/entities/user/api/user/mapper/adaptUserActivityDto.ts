import type { TUserActivity } from '../../../model/user';
import type { ClaimsActivityDto } from '../dto';

const USER_ACTIVITY_MAP: Record<ClaimsActivityDto, TUserActivity> = {
  0: 'TechnicalSpecialist',
  1: 'Seller',
};

export const adaptUserActivityDto = (activity: ClaimsActivityDto): TUserActivity => {
  return USER_ACTIVITY_MAP[activity];
};
