import type { AttachedFileDto } from './attachedFileDto';

export type CommentThemeDto =
  | 'Новый комментарий'
  | 'Изменение статуса'
  | 'Закрытие обращения пользователем'
  | '';

export interface CommentDto {
  Id: number | string;
  CreatedAt: string;
  Content: string;
  ExternalAuthorId?: string;
  AuthorId: string;
  AuthorName: string;
  IsForUser: boolean;
  Files: AttachedFileDto[];
  Theme?: CommentThemeDto;
  Status?: number | null;
  UserStatus?: number | null;
}
