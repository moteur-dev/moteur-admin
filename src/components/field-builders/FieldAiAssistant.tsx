// components/field-builder/FieldAiAssistant.tsx

import { useState } from 'react';
import { Button, Input, Space, message } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import { api } from '@/utils/apiClient';

export interface FieldAiAssistantProps {
  onGenerate: (fields: Record<string, any>) => void;
  existingFields?: Record<string, any>;
  compact?: boolean;
  mergeMode?: boolean; // optional override
}

export function FieldAiAssistant({
  onGenerate,
  existingFields = {},
  compact = false,
  mergeMode = true,
}: FieldAiAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await api.post('/ai/generate-fields', {
        prompt,
        currentFields: existingFields,
      });

      const newFields = response.data.fields;
      const final = mergeMode ? { ...existingFields, ...newFields } : newFields;

      onGenerate(final);
      message.success('Fields generated');
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'AI generation failed';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <Space.Compact block style={{ width: '100%' }}>
        <Input
          placeholder="Describe your model (e.g. product, page, contact)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <Button
          icon={<RobotOutlined />}
          loading={loading}
          onClick={handleGenerate}
        />
      </Space.Compact>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input.TextArea
        rows={3}
        placeholder="Describe your model (e.g. blog post, team member, store)..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />
      <Button
        icon={<RobotOutlined />}
        loading={loading}
        onClick={handleGenerate}
        type="dashed"
      >
        Generate Fields
      </Button>
    </Space>
  );
}
