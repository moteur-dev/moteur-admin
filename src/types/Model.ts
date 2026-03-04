export interface ModelField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: unknown;
}

export interface ModelSchema {
  id: string;
  label: string;
  fields: Record<string, ModelField> | ModelField[];
  description?: string;
}
