import type { InjectionToken } from 'tsyringe';

import type { IClaimApi } from './claimApi';

export const CLAIM_API_TOKEN: InjectionToken<IClaimApi> = Symbol('CLAIM_API_TOKEN');
