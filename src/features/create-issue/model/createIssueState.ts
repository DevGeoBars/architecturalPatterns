import type {
  CreateIssueData,
  Issue,
} from '@/entities/issue';

import type {
  TCreateIssueRequestStatus,
} from './createIssueRequestStatus';

export interface ICreateIssueState {
  formData: CreateIssueData;

  requestStatus:
    TCreateIssueRequestStatus;

  error: string | null;

  updateField: <
    TField extends keyof CreateIssueData,
  >(
    field: TField,
    value: CreateIssueData[TField],
  ) => void;

  resetForm: () => void;

  submit: () => Promise<
    Issue | null
  >;
}
