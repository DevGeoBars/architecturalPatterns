import type {
  ChangeEvent,
} from 'react';

import {
  Textarea,
} from '@primereact/ui/textarea';

import type {
  IHtmlEditorProps,
} from './htmlEditor.types';

import './HtmlEditor.scss';

export const HtmlEditor = ({
  value,
  onChange,
  isDisabled = false,
}: IHtmlEditorProps) => {
  const handleChange = (
    event:
    ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    onChange(
      event.target.value,
    );
  };

  return (
    <div className="html-editor">
      <Textarea
        value={value}
        disabled={isDisabled}
        rows={8}
        autoResize
        onChange={
          handleChange
        }
      />
    </div>
  );
};
