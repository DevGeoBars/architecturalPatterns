import type {
  CommentDto,
} from './dto/commentDto';

export interface UpdateIssueCommentsDto {
  Comments: CommentDto[];
}
