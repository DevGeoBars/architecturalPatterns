import type { IHttpApiClient } from '@/shared/api';

import type { Claim } from '../../model/claim';
import type { ClaimsCollectionDto } from './dto';
import { adaptClaimDto } from './mapper/adaptClaimDto';

export interface IClaimApi {
  getClaims(): Promise<Claim[]>;
}

export class ClaimApi implements IClaimApi {
  constructor(readonly httpApiClient: IHttpApiClient) {}

  async getClaims(): Promise<Claim[]> {
    const response = await this.httpApiClient.get<ClaimsCollectionDto>('/api/claims');

    if (response === null) {
      throw new Error('Сервер не вернул список заявок');
    }

    return response.Data.map(adaptClaimDto);
  }
}
