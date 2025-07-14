// components/field-builder/editors/NumberFieldEditor.tsx

import { Form, Input, InputNumber, Tabs } from 'antd';
import type { FieldEditorProps } from './types';

export function NumberFieldEditor({ field, onChange }: FieldEditorProps) {
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
          label: 'Main',
          children: (
            <>
              <Form.Item label="Label">
                <Input
                  value={field.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Default Value">
                <InputNumber
                  value={field.default}
                  onChange={(val) => handleChange('default', val)}
                  style={{ width: '100%' }}
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
              <Form.Item label="Minimum">
                <InputNumber
                  value={field.min}
                  onChange={(val) => handleChange('min', val)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Maximum">
                <InputNumber
                  value={field.max}
                  onChange={(val) => handleChange('max', val)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Step">
                <InputNumber
                  value={field.step}
                  onChange={(val) => handleChange('step', val)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </>
          ),
        },
      ]}
    />
  );
}
