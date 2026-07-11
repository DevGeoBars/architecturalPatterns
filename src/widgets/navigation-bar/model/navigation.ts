export interface INavigationItem {
  text: string;
  path: string;
  icon?: string;
  items?: INavigationItem[];
}