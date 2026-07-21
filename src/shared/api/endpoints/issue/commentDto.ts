import type { AttachedFileDto } from './attachedFileDto';

export type TCommentThemeDto =
  | 'Новый комментарий'
  | 'Изменение статуса'
  | 'Закрытие обращения пользователем'
  | '';

export interface CommentDto {
  Id: string;
  CreatedAt: string;
  Content: string;

  ExternalAuthorId?: string;

  AuthorId: string;
  AuthorName: string;

  IsForUser: boolean;

  Files: AttachedFileDto[];

  Theme?: TCommentThemeDto;

  Status?: number;

  UserStatus?: number;
}
