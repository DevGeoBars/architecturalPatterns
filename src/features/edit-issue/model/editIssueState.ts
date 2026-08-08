import type {
  Issue,

  UpdateIssueData,
} from '@/entities/issue';

import type {
  TEditIssueRequestStatus,
} from './editIssueRequestStatus';

export interface IEditIssueState {
  formData:
    UpdateIssueData;

  requestStatus:
    TEditIssueRequestStatus;

  error: string | null;

  updateField: <
    TField extends
      keyof UpdateIssueData,
  >(
    field: TField,

    value:
    UpdateIssueData[TField],
  ) => void;

  submit: () => Promise<
    Issue | null
  >;
}
