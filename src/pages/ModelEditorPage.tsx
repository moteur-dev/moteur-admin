import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spin, Button, Form, message, List, Typography } from 'antd';

import { useProject } from '@/hooks/useProject';
import { useModel } from '@/hooks/useModel';
import { useModelEntries } from '@/hooks/useModelEntries';
import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useCurrentModel } from '@/hooks/useCurrentModel';
import { api } from '@/utils/apiClient';

import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { ModelMetaForm } from '@/components/models/ModelMetaForm';
import { ModelFieldEditor } from '@/components/models/ModelFieldEditor';

const { Text } = Typography;

export function ModelEditorPage() {
  const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();

  const { setProject } = useCurrentProject();
  const { setModel } = useCurrentModel();

  const { data: project } = useProject(projectId!);
  const { data: model, loading, error } = useModel(projectId, modelId);
  const { data: entries, loading: entriesLoading, error: entriesError } = useModelEntries(projectId, modelId);

  const [metaForm] = Form.useForm();
  const [fields, setFields] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) setProject(project.id, project.label, project);
  }, [project, setProject]);

  useEffect(() => {
    if (model) {
      setModel(model.id, model.label, model);
      metaForm.setFieldsValue(model);
      setFields(model.fields || {});
    }
  }, [model, setModel, metaForm]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const meta = metaForm.getFieldsValue();
      const updatedModel = {
        id: meta.id.trim(),
        label: meta.label.trim(),
        type: meta.type,
        description: meta.description?.trim(),
        fields,
      };

      await api.patch(`/projects/${projectId}/models/${modelId}`, updatedModel);
      message.success('Model saved');
    } catch (err) {
      message.error('Failed to save model');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MoteurPageLayout title={`Edit Model: ${model?.label || modelId}`}>
      {loading ? (
        <Spin />
      ) : error ? (
        <Alert message="Failed to load model" description={error} type="error" showIcon />
      ) : (
        <>
          <ModelMetaForm form={metaForm} />
          <ModelFieldEditor fields={fields} onChange={setFields} />

          <div style={{ marginTop: 32, textAlign: 'right' }}>
            <Button type="primary" onClick={handleSave} loading={saving}>
              Save Model
            </Button>
          </div>

          <div style={{ marginTop: 48 }}>
            <h3>Entries for this model</h3>
            {entriesError && <Alert type="error" message={entriesError} showIcon />}
            {entriesLoading ? (
              <Spin />
            ) : entries?.length === 0 ? (
              <Text type="secondary">No entries found.</Text>
            ) : (
              <List
                size="small"
                bordered
                dataSource={entries}
                style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}
                renderItem={(entry) => (
                  <List.Item>
                    <Text>{entry.label || entry.id}</Text>
                  </List.Item>
                )}
              />
            )}

            <Button type="default" href={`/projects/${projectId}/models/${modelId}/entries`}>
              Manage Entries
            </Button>
          </div>
        </>
      )}
    </MoteurPageLayout>
  );
}
