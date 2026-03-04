import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, Alert, Typography, message } from 'antd';

import { useBlueprint } from '@/hooks/useBlueprints';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { api } from '@/utils/apiClient';
import type { BlueprintSchema } from '@/hooks/useBlueprints';

const { TextArea } = Input;
const { Text } = Typography;

export function BlueprintEditorPage() {
  const { blueprintId } = useParams<{ blueprintId: string }>();
  const navigate = useNavigate();
  const isNew = blueprintId === 'new';

  const { data: blueprint, loading, error } = useBlueprint(isNew ? null : blueprintId!);

  const [form] = Form.useForm<{ id: string; name: string; description: string; templateJson: string }>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (blueprint) {
      form.setFieldsValue({
        id: blueprint.id,
        name: blueprint.name,
        description: blueprint.description ?? '',
        templateJson: blueprint.template
          ? JSON.stringify(blueprint.template, null, 2)
          : '{\n  "models": [],\n  "layouts": [],\n  "structures": []\n}',
      });
    } else if (isNew) {
      form.setFieldsValue({
        id: '',
        name: '',
        description: '',
        templateJson: '{\n  "models": [],\n  "layouts": [],\n  "structures": []\n}',
      });
    }
  }, [blueprint, isNew, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      let template: BlueprintSchema['template'];
      try {
        template = values.templateJson ? JSON.parse(values.templateJson) : undefined;
      } catch {
        message.error('Template must be valid JSON');
        return;
      }

      const payload: BlueprintSchema = {
        id: values.id.trim(),
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        template,
      };

      setSaving(true);
      if (isNew) {
        await api.post('/blueprints', payload);
        message.success('Blueprint created');
        navigate('/blueprints');
      } else {
        await api.patch(`/blueprints/${encodeURIComponent(blueprintId!)}`, {
          name: payload.name,
          description: payload.description,
          template: payload.template,
        });
        message.success('Blueprint updated');
      }
    } catch (err: any) {
      if (err.errorFields) return;
      message.error(err.response?.data?.error ?? err.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const listPath = '/blueprints';

  if (!isNew && loading) {
    return (
      <MoteurPageLayout title="Blueprint">
        <Spin />
      </MoteurPageLayout>
    );
  }

  if (!isNew && error) {
    return (
      <MoteurPageLayout title="Blueprint">
        <Alert type="error" message="Failed to load blueprint" description={error} showIcon />
        <Button style={{ marginTop: 16 }} onClick={() => navigate(listPath)}>
          Back to Blueprints
        </Button>
      </MoteurPageLayout>
    );
  }

  return (
    <MoteurPageLayout
      title={isNew ? 'Create Blueprint' : `Edit: ${blueprint?.name ?? blueprintId}`}
      extra={
        <Button onClick={() => navigate(listPath)}>Back to Blueprints</Button>
      }
    >
      <Form form={form} layout="vertical" style={{ maxWidth: 640 }}>
        <Form.Item
          name="id"
          label="ID"
          rules={[
            { required: true, message: 'ID is required' },
            { pattern: /^[\w-]+$/, message: 'Only letters, numbers, underscores, hyphens' },
          ]}
        >
          <Input placeholder="e.g. blog" disabled={!isNew} />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
          <Input placeholder="e.g. Blog Site" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={2} placeholder="Short description for the project creation wizard" />
        </Form.Item>
        <Form.Item
          name="templateJson"
          label="Template (JSON)"
          extra={
            <Text type="secondary">
              Optional. Models, layouts, and structures to apply when creating a project from this blueprint.
              Leave as empty arrays if you only need metadata.
            </Text>
          }
        >
          <TextArea rows={12} placeholder='{ "models": [], "layouts": [], "structures": [] }' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave} loading={saving}>
            {isNew ? 'Create Blueprint' : 'Save'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate(listPath)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </MoteurPageLayout>
  );
}
