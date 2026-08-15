import type { IHttpApiClient } from '@/shared/api/httpClient';

export const logout = async (httpApiClient: IHttpApiClient): Promise<void> => {
    await httpApiClient.post('/api/auth/logout');
  };
