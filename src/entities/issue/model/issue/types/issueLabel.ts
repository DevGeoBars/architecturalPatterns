export interface IssueLabel {
  id: number;
  name: string;
  color: string;
  message: string | null;
  ownerId: number;
  statusCode: number;
}

