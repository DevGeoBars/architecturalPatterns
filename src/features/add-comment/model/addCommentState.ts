import type {
  Issue,
} from '@/entities/issue';

import type {
  AddCommentFormData,
} from './addCommentFormData';

import type {
  TAddCommentRequestStatus,
} from './addCommentRequestStatus';

export interface IAddCommentState {
  formData:
    AddCommentFormData;

  requestStatus:
    TAddCommentRequestStatus;

  error: string | null;

  setContent: (
    content: string,
  ) => void;

  resetForm: () => void;

  submit: (
    issue: Issue,

    authorId: string,

    authorName: string,
  ) => Promise<
    Issue | null
  >;
}
