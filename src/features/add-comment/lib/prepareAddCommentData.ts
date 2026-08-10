import type {
  AddCommentFormData,
} from '../model/addCommentFormData';

export const prepareAddCommentData = (
  data:
  AddCommentFormData,
): AddCommentFormData => {
  return {
    content:
      data.content.trim(),
  };
};
