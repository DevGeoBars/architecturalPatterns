import type { TAppConfig } from './appConfig.types';

export const appConfig: TAppConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
};
