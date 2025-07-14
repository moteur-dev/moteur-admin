  import { Form } from 'antd';
  import { FieldRendererRegistry } from '@/components/fields';
  import type { Field } from '@/components/fields/FieldRendererProps';

  interface DynamicEntryFormProps {
    fields: Record<string, Field>;
    form: any;
    initialValues?: Record<string, any>;
    readOnly?: boolean;
    onValuesChange?: (values: any) => void;
  }

  export function DynamicEntryForm({
    fields,
    form,
    initialValues,
    readOnly = false,
    onValuesChange,
  }: DynamicEntryFormProps) {
    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        disabled={readOnly}
        onValuesChange={(_, all) => onValuesChange?.(all)}
      >
        {Object.entries(fields).map(([key, schema]) => {
          const FieldComponent = FieldRendererRegistry.get(schema.type);

          return (
            <Form.Item
              key={key}
              name={key}
              label={schema.label || key}
              help={schema.description}
              rules={schema.required ? [{ required: true, message: `${schema.label || key} is required` }] : []}
            >
              <FieldComponent
                name={key}
                value={form.getFieldValue(key)}
                onChange={(val) => {
                  form.setFieldValue(key, val);
                  onValuesChange?.({ ...form.getFieldsValue(), [key]: val });
                }}
                schema={schema}
                readOnly={readOnly}
                data-testid={`field-${key}`}
              />
            </Form.Item>
          );
        })}
      </Form>
    );
  }
