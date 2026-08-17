import type { IHttpApiClient } from '@/shared/api';

export const logout = async (httpApiClient: IHttpApiClient): Promise<void> => {
    await httpApiClient.post<void>('/api/auth/logout');
  };
