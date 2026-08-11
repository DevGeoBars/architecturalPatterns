import { create } from 'zustand';

import type { IIssueReferenceDataApi } from '../../../api/static-dictionaries-data';
import type { IssueReferenceData } from '../types/issueReferenceData';

import {
  getStoredIssueReferenceData,
  setStoredIssueReferenceData,
} from '../../../lib/storage/issueReferenceDataStorage';

export type TIssueReferenceDataRequestStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export interface IIssueReferenceDataState {
  data: IssueReferenceData | null;
  requestStatus: TIssueReferenceDataRequestStatus;
  error: string | null;
  ensureLoaded: (api: IIssueReferenceDataApi) => Promise<void>;
}

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : 'Не удалось загрузить справочники обращения';
};

export const useIssueReferenceDataStore =
  create<IIssueReferenceDataState>((set, get) => ({
    data: null,
    requestStatus: 'idle',
    error: null,

    ensureLoaded: async (api) => {
      const { data, requestStatus } = get();

      if (data !== null || requestStatus === 'loading') {
        return;
      }

      const storedData = getStoredIssueReferenceData();

      if (storedData !== null) {
        set({
          data: storedData,
          requestStatus: 'success',
          error: null,
        });

        return;
      }

      set({
        requestStatus: 'loading',
        error: null,
      });

      try {
        const referenceData = await api.getReferenceData();

        setStoredIssueReferenceData(referenceData);

        set({
          data: referenceData,
          requestStatus: 'success',
          error: null,
        });
      } catch (error) {
        set({
          data: null,
          requestStatus: 'error',
          error: getErrorMessage(error),
        });
      }
    },
  }));