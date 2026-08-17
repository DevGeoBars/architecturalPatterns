import type { AddCommentFormData } from '../addCommentFormData';

export const prepareAddCommentData = (
  data: AddCommentFormData,
): AddCommentFormData => {
  return {
    content: data.content.trim(),
  };
};
