import {
  Editor as PrimeReactEditor,

  type EditorTextChangeEvent,
} from 'primereact/editor';

import type {
  IHtmlEditorProps,
} from '../model/htmlEditor';

import './HtmlEditor.scss';

export const HtmlEditor = ({
  value,

  onChange,

  isDisabled = false,
}: IHtmlEditorProps) => {
  const handleTextChange = (
    event:
    EditorTextChangeEvent,
  ): void => {
    onChange(
      event.htmlValue ?? '',
    );
  };

  return (
    <div className="html-editor">
      <PrimeReactEditor
        value={value}
        readOnly={
          isDisabled
        }
        onTextChange={
          handleTextChange
        }
        style={{
          height: '180px',
        }}
      />
    </div>
  );
};
