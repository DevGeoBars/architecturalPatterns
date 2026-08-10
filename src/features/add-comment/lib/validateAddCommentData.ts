import type {
  AddCommentFormData,
} from '../model/addCommentFormData';

export const isAddCommentContentEmpty = (
  content: string,
): boolean => {
  const textContent =
    content
      .replace(
        /<br\s*\/?>/gi,
        '',
      )
      .replace(
        /<[^>]+>/g,
        '',
      )
      .replace(
        /&nbsp;/gi,
        ' ',
      )
      .replace(
        /\s+/g,
        '',
      );

  return (
    textContent.length ===
    0
  );
};

export const validateAddCommentData = (
  data:
  AddCommentFormData,
): string | null => {
  if (
    isAddCommentContentEmpty(
      data.content,
    )
  ) {
    return 'Введите комментарий';
  }

  return null;
};
