import type {
  IHttpApiClient,
} from '@/shared/api/httpClient';

import type {
  Claim,
} from '../model/claim';

import {
  adaptClaimDto,
} from './adaptClaimDto';

import type {
  ClaimsCollectionDto,
} from './dto';

export interface IClaimApi {
  getClaims(): Promise<Claim[]>;
}

export class ClaimApi
  implements IClaimApi
{
  constructor(
    readonly httpApiClient:
    IHttpApiClient,
  ) {}

  async getClaims(): Promise<
    Claim[]
  > {
    const response =
      await this.httpApiClient.get<ClaimsCollectionDto>(
        '/api/claims',
      );

    return response.Data.map(
      adaptClaimDto,
    );
  }
}
