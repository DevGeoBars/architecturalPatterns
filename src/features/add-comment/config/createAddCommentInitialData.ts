import type {
  AddCommentFormData,
} from '../model/addCommentFormData';

export const createAddCommentInitialData =
  (): AddCommentFormData => ({
    content: '',
  });
