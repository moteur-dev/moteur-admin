// components/field-builder/editors/HtmlFieldEditor.tsx

import { Form, InputNumber, Input, Switch, Tag, Space, Button } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { FieldEditorProps } from './types';

export function HtmlFieldEditor({ field, onChange }: FieldEditorProps) {
  const [tagInput, setTagInput] = useState('');

  const handleChange = (key: string, value: any) => {
    onChange({
      ...field,
      [key]: value,
    });
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const tags = Array.isArray(field.allowedTags) ? [...field.allowedTags] : [];
    if (!tags.includes(tagInput.trim())) {
      handleChange('allowedTags', [...tags, tagInput.trim()]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    const tags = field.allowedTags?.filter((t: string) => t !== tag) || [];
    handleChange('allowedTags', tags);
  };

  return (
    <>
      <Form.Item label="Label">
        <Input
          value={field.label}
          onChange={(e) => handleChange('label', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Minimum Length">
        <InputNumber
          value={field.minLength}
          onChange={(value) => handleChange('minLength', value)}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Maximum Length">
        <InputNumber
          value={field.maxLength}
          onChange={(value) => handleChange('maxLength', value)}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Allow Empty">
        <Switch
          checked={field.allowEmpty ?? false}
          onChange={(checked) => handleChange('allowEmpty', checked)}
        />
      </Form.Item>

      <Form.Item label="Allowed HTML Tags">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space wrap>
            {Array.isArray(field.allowedTags) &&
              field.allowedTags.map((tag: string) => (
                <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
          </Space>
          <Input
            placeholder="Add HTML tag (e.g. p, strong, em)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onPressEnter={handleAddTag}
            style={{ width: '200px' }}
            suffix={
              <Button icon={<PlusOutlined />} onClick={handleAddTag} />
            }
          />
        </Space>
      </Form.Item>
    </>
  );
}
