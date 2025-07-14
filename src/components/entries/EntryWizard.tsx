import { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { AiOutlineRobot } from "react-icons/ai";
import { api } from '@/utils/apiClient';
import { DynamicEntryForm } from '@/components/entries/DynamicEntryForm';
import { SaveBox } from '../forms/SaveBox';

export function AIPromptModal({
  onGenerate,
  onCancel,
  projectId,
  modelId,
  locale = 'en',
}: {
  onGenerate: (fields: any) => void;
  onCancel: () => void;
  projectId: string;
  modelId: string;
  locale?: string;
}) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ai/generate-entry', {
        prompt,
        projectId,
        modelId,
        locale,
      });

      const entry = res.data?.entry;
      if (!entry?.data) {
        throw new Error('No data returned from AI');
      }

      onGenerate(entry.data); // Pass only entry.data to populate the form
    } catch (err: any) {
      message.error(err?.response?.data?.error || err.message || 'Failed to generate entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Generate Entry with AI"
      open
      onCancel={onCancel}
      onOk={handleGenerate}
      okText="Generate"
      confirmLoading={loading}
    >
      <Input.TextArea
        rows={4}
        placeholder="Describe the entry you want to generate"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
      />
    </Modal>
  );
}

interface EntryWizardProps {
  projectId: string;
  modelId: string;
  model: {
    id: string;
    label: string;
    fields: Record<string, any>;
  };
  onClose: () => void;
  title?: string;
  initialId?: string;
  showAI?: boolean;
  'aria-label'?: string;
}

export function EntryWizard({
  projectId,
  modelId,
  model,
  onClose,
  title = `Create Entry for ${model.label}`,
  initialId = `entry-${Date.now()}`,
  showAI = true,
  'aria-label': ariaLabel = 'Create new entry',
}: EntryWizardProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await api.post(`/projects/${projectId}/models/${modelId}/entries`, {
        id: values.id,
        type: modelId,
        data: values,
      });
      message.success('Entry created');
      onClose();
    } catch (err: any) {
      if (err.name !== 'ValidationError') {
        message.error(err.message || 'Failed to create entry');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={title}
      open
      onCancel={onClose}
      width={720}
      footer={null}
      destroyOnClose
      aria-label={ariaLabel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ id: initialId }}
        onValuesChange={(_, all) => console.log('Form changed:', all)}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'An ID is required' }]}
        >
          <Input
            placeholder="e.g. post-001"
            onBlur={() => {
              const current = form.getFieldValue('id');
              if (!current) {
                form.setFieldValue('id', `entry-${Date.now()}`);
              }
            }}
          />
        </Form.Item>

        {showAI && (
          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <Button size="small" onClick={() => setShowAIModal(true)} title="Generate with AI">
              <AiOutlineRobot />
            </Button>
          </div>
        )}

        <DynamicEntryForm fields={model.fields} form={form} />

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <SaveBox
            isDraft={false}
            loading={submitting}
            onSave={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </Form>

      {showAIModal && (
        <AIPromptModal
          projectId={projectId}
          modelId={modelId}
          onGenerate={(values) => {
            form.setFieldsValue(values);
            setShowAIModal(false);
          }}
          onCancel={() => setShowAIModal(false)}
        />
      )}
    </Modal>
  );
}
