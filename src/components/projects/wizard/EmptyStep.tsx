// src/components/projects/wizard/EmptyStep.tsx

import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { api } from '@/utils/apiClient';

const { Title } = Typography;

interface EmptyStepProps {
  selectedBlueprintId?: string;
  onBack: () => void;
  onFinish: () => void;
}

export function EmptyStep({ selectedBlueprintId, onBack, onFinish }: EmptyStepProps) {
  const [form] = Form.useForm<{ name: string; label: string }>();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: { name: string; label: string }) => {
    setLoading(true);
    try {
      await api.post('/projects', {
        id: values.name.trim(),
        label: values.label.trim(),
        defaultLocale: 'en',
        ...(selectedBlueprintId && { blueprintId: selectedBlueprintId }),
      });
      message.success('Project created');
      onFinish();
    } catch (err: any) {
      message.error(err.response?.data?.error ?? err.message ?? 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={5}>Start an Empty Project</Title>
      <Form form={form} onFinish={handleCreate} layout="vertical">
        <Form.Item
          name="name"
          label="Project ID"
          rules={[{ required: true, message: 'Unique ID required' }]}
        >
          <Input placeholder="e.g. marketing-site" />
        </Form.Item>
        <Form.Item
          name="label"
          label="Project Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Marketing Site" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack} style={{ marginRight: 8 }}>Back</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Create</Button>
        </Form.Item>
      </Form>
    </>
  )
}
