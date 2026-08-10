export interface IHtmlEditorProps {
  value: string;

  onChange: (
    value: string,
  ) => void;

  isDisabled?: boolean;
}
