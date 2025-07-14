// components/field-builder/editors/BooleanFieldEditor.tsx

import { Form, Input, Switch, Tabs } from 'antd';
import type { FieldEditorProps } from './types';

export function BooleanFieldEditor({ field, onChange }: FieldEditorProps) {
  const handleChange = (key: string, value: any) => {
    onChange({
      ...field,
      [key]: value,
    });
  };

  return (
    <Tabs
      defaultActiveKey="main"
      items={[
        {
          key: 'main',
          label: 'Boolean',
          children: (
            <>
              <Form.Item label="Label">
                <Input
                  value={field.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Description">
                <Input
                  value={field.description ?? ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Default Value">
                <Switch
                  checked={field.default ?? false}
                  onChange={(checked) => handleChange('default', checked)}
                />
              </Form.Item>
            </>
          ),
        },
        {
          key: 'options',
          label: 'Options',
          children: (
            <>
              <Form.Item label="True Label">
                <Input
                  value={field.trueLabel ?? 'Yes'}
                  onChange={(e) => handleChange('trueLabel', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="False Label">
                <Input
                  value={field.falseLabel ?? 'No'}
                  onChange={(e) => handleChange('falseLabel', e.target.value)}
                />
              </Form.Item>
            </>
          ),
        },
      ]}
    />
  );
}
