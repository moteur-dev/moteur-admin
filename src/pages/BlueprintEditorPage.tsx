import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Button, Spin, Alert, Typography, message } from 'antd';

import { useBlueprint } from '@/hooks/useBlueprints';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { api } from '@/utils/apiClient';
import type { BlueprintSchema, BlueprintKind } from '@/hooks/useBlueprints';

const { TextArea } = Input;
const { Text } = Typography;

function kindFromParam(k: string | null): BlueprintKind {
  if (k === 'model' || k === 'structure') return k;
  return 'project';
}

export function BlueprintEditorPage() {
  const { blueprintId } = useParams<{ blueprintId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kind = kindFromParam(searchParams.get('kind'));
  const isNew = blueprintId === 'new';

  const { data: blueprint, loading, error } = useBlueprint(isNew ? null : blueprintId!, kind);

  const [form] = Form.useForm<{ id: string; name: string; description: string; templateJson: string }>();
  const [saving, setSaving] = useState(false);

  const defaultTemplateJson =
    kind === 'model'
      ? '{\n  "model": {}\n}'
      : kind === 'structure'
        ? '{\n  "structure": {}\n}'
        : '{\n  "models": [],\n  "layouts": [],\n  "structures": []\n}';

  useEffect(() => {
    if (blueprint) {
      form.setFieldsValue({
        id: blueprint.id,
        name: blueprint.name,
        description: blueprint.description ?? '',
        templateJson: blueprint.template ? JSON.stringify(blueprint.template, null, 2) : defaultTemplateJson,
      });
    } else if (isNew) {
      form.setFieldsValue({
        id: '',
        name: '',
        description: '',
        templateJson: defaultTemplateJson,
      });
    }
  }, [blueprint, isNew, form, kind]);

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

      const basePath =
        kind === 'project' ? '/blueprints/projects' : kind === 'model' ? '/blueprints/models' : '/blueprints/structures';
      setSaving(true);
      if (isNew) {
        await api.post(basePath, { ...payload, kind });
        message.success('Blueprint created');
        navigate(`/blueprints?kind=${kind}`);
      } else {
        await api.patch(`${basePath}/${encodeURIComponent(blueprintId!)}`, {
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

  const listPath = `/blueprints${kind === 'project' ? '' : `?kind=${kind}`}`;

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
              {kind === 'project' &&
                'Optional. Models, layouts, and structures to apply when creating a project from this blueprint. Leave as empty arrays if you only need metadata.'}
              {kind === 'model' && 'Single model schema under "model". Used when adding a model from this blueprint.'}
              {kind === 'structure' && 'Single structure schema under "structure". Used when adding a structure from this blueprint.'}
            </Text>
          }
        >
          <TextArea
            rows={12}
            placeholder={
              kind === 'model'
                ? '{ "model": { "id": "...", "label": "...", "fields": {} } }'
                : kind === 'structure'
                  ? '{ "structure": { ... } }'
                  : '{ "models": [], "layouts": [], "structures": [] }'
            }
          />
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
