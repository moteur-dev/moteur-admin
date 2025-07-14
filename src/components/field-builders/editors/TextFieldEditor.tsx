// components/field-builder/editors/TextFieldEditor.tsx

import { Form, Input, Switch, InputNumber, Tabs } from 'antd';
import type { FieldEditorProps } from './types';

export function TextFieldEditor({ field, onChange }: FieldEditorProps) {
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
          label: 'Text',
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
                <Input
                  value={field.default ?? ''}
                  onChange={(e) => handleChange('default', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Multilingual">
                <Switch
                  checked={field.multilingual ?? true}
                  onChange={(checked) => handleChange('multilingual', checked)}
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
              <Form.Item label="Placeholder">
                <Input
                  value={field.placeholder ?? ''}
                  onChange={(e) => handleChange('placeholder', e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Enable Autocomplete">
                <Switch
                  checked={field.autocomplete ?? false}
                  onChange={(checked) => handleChange('autocomplete', checked)}
                />
              </Form.Item>

              <Form.Item label="Allow Empty">
                <Switch
                  checked={field.allowEmpty ?? false}
                  onChange={(checked) => handleChange('allowEmpty', checked)}
                />
              </Form.Item>
            </>
          ),
        },
        {
          key: 'validation',
          label: 'Validation',
          children: (
            <>
              <Form.Item label="Min Length">
                <InputNumber
                  value={field.minLength}
                  onChange={(val) => handleChange('minLength', val)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Max Length">
                <InputNumber
                  value={field.maxLength}
                  onChange={(val) => handleChange('maxLength', val)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Pattern">
                <Input
                  value={field.validation?.pattern ?? ''}
                  onChange={(e) =>
                    handleChange('validation', {
                      ...field.validation,
                      pattern: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item label="Error Message">
                <Input
                  value={field.validation?.message ?? ''}
                  onChange={(e) =>
                    handleChange('validation', {
                      ...field.validation,
                      message: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </>
          ),
        },
      ]}
    />
  );
}
