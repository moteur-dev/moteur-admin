// editors/FieldEditorRegistry.ts

import { BooleanFieldEditor } from './BooleanFieldEditor';
import { HtmlFieldEditor } from './HtmlFieldEditor';
import { NumberFieldEditor } from './NumberFieldEditor';
import { TextFieldEditor } from './TextFieldEditor';
import type { FieldEditorProps } from './types';

export const FieldEditorRegistry: Record<string, React.FC<FieldEditorProps>> = {
  'core/boolean': BooleanFieldEditor,
  'core/html': HtmlFieldEditor,
  'core/text': TextFieldEditor,
  'core/number': NumberFieldEditor,
};
