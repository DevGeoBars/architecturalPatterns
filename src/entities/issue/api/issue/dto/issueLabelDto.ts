export interface IssueLabelDto {
  Id: number;
  Name: string;
  Color: string;
  Message: string | null;
  OwnerId: number;
  StatusCode: number;
}
