export interface FieldEditorProps<T = Record<string, any>> {
  field: T;
  onChange: (updated: T) => void;
}