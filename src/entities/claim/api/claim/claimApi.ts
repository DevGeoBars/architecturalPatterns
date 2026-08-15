import type { IHttpApiClient } from '@/shared/api';

import type { Claim } from '../../model/claim';
import { isClaimsCollectionDto } from './validation/isClaimsCollectionDto';
import { adaptClaimDto } from './mapper/adaptClaimDto';

export interface IClaimApi {
  getClaims(): Promise<Claim[]>;
}

export class ClaimApi implements IClaimApi {
  constructor(readonly httpApiClient: IHttpApiClient) {}

  async getClaims(): Promise<Claim[]> {
    const response = await this.httpApiClient.get('/api/claims');

    if (!isClaimsCollectionDto(response)) {
      throw new Error('Сервер вернул некорректный список заявок');
    }

    return response.Data.map(adaptClaimDto);
  }
}
