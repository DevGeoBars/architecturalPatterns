import type { AttachedFile } from './attachedFile';
import type { TIssueStatus } from './issueStatus';
import type { TIssueUserStatus } from './issueUserStatus';

export type TCommentTheme =
  | 'Новый комментарий'
  | 'Изменение статуса'
  | 'Закрытие обращения пользователем'
  | '';

export interface Comment {
  id: number;
  createdAt: Date;
  content: string;
  externalAuthorId?: string;
  authorId: string;
  authorName: string;
  isForUser: boolean;
  files: AttachedFile[];
  theme: TCommentTheme;
  status: TIssueStatus | null;
  userStatus: TIssueUserStatus | null;
}
