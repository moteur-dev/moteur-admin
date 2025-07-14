import { useState } from 'react';
import {
  Modal,
  Steps,
  Button,
  Form,
  Input,
  message,
  Typography,
  Space,
  Card,
} from 'antd';
import { FieldBuilder } from '@/components/field-builders/FieldBuilder';
import { JsonFieldEditor } from '@/components/field-builders/JsonFieldEditor';
import { api } from '@/utils/apiClient';
import { ModelTypeSelector } from './ModelTypeSelector';

const { Step } = Steps;
const { Title } = Typography;

type StepKey = 'blueprint' | 'meta' | 'fields';
const stepKeys: StepKey[] = ['blueprint', 'meta', 'fields'];

interface ModelWizardProps {
  projectId: string;
  onClose: () => void;
  showAI?: boolean;
  title?: string;
}

export function ModelWizard({ projectId, onClose, showAI = true, title = 'Create New Model' }: ModelWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [metaForm] = Form.useForm();

  const [fields, setFields] = useState<Record<string, any>>({});
  const [viewMode] = useState<'visual' | 'json'>('visual');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    const key = stepKeys[currentStep];
    if (key === 'meta') {
      try {
        await metaForm.validateFields();
        setCurrentStep(currentStep + 1);
      } catch {
        message.error('Please fill all required fields.');
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { id, label, type, description } = metaForm.getFieldsValue();
      const model = {
        id: id.trim(),
        label: label.trim(),
        type,
        description: description?.trim(),
        fields,
      };

      const response = await api.post(`/projects/${projectId}/models`, model);
      if (response.status !== 201) throw new Error('Failed to create model');

      message.success('Model created successfully');
      onClose();
    } catch (err: any) {
      message.error(err.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={title}
      open
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
      aria-label="Create new model"
    >
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Step title="Blueprint" />
        <Step title="Details" />
        <Step title="Fields" />
      </Steps>

      {stepKeys[currentStep] === 'blueprint' && (
        <div>
          <Title level={4}>Start with a template</Title>
          <Space wrap size="middle">
            <Card hoverable onClick={() => setCurrentStep(currentStep + 1)} style={{ width: 200 }}>
              <Title level={5}>Start from scratch</Title>
              <p>Begin with no predefined fields</p>
            </Card>
            <Card hoverable onClick={() => {
              metaForm.setFieldsValue({ id: 'post', label: 'Post', type: 'content', description: 'Blog post or article' });
              setFields({ title: { type: 'core/text' }, body: { type: 'core/markdown' } });
              setCurrentStep(currentStep + 1);
            }} style={{ width: 200 }}>
              <Title level={5}>Post</Title>
              <p>Title + Markdown body</p>
            </Card>
            <Card hoverable onClick={() => {
              metaForm.setFieldsValue({ id: 'product', label: 'Product', type: 'content', description: 'A product item with price' });
              setFields({ name: { type: 'core/text' }, price: { type: 'core/number' } });
              setCurrentStep(currentStep + 1);
            }} style={{ width: 200 }}>
              <Title level={5}>Product</Title>
              <p>Name + Price field</p>
            </Card>
          </Space>
        </div>
      )}

      {stepKeys[currentStep] === 'meta' && (
        <Form
          form={metaForm}
          layout="vertical"
          initialValues={{ type: 'content' }}
        >
          <Form.Item label="ID" name="id" rules={[{ required: true, message: 'ID is required' }]}> <Input placeholder="e.g. product" autoFocus /> </Form.Item>
          <Form.Item label="Label" name="label" rules={[{ required: true, message: 'Label is required' }]}> <Input placeholder="e.g. Product" /> </Form.Item>
          <Form.Item label="Type" name="type" rules={[{required: true, message: 'Type is required'}]}>
            <ModelTypeSelector />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Description is required' }]}> <Input.TextArea rows={3} placeholder="Required" /> </Form.Item>
        </Form>
      )}

      {stepKeys[currentStep] === 'fields' && (
        <>

          {viewMode === 'visual' ? (
            <FieldBuilder fields={fields} onChange={setFields} showAI={showAI} />
          ) : (
            <JsonFieldEditor value={fields} onChange={setFields} showAI={showAI} />
          )}
        </>
      )}

      <div style={{ marginTop: 32, textAlign: 'right' }}>
        {currentStep > 0 && (
          <Button onClick={handleBack} style={{ marginRight: 8 }}>Back</Button>
        )}
        {currentStep < stepKeys.length - 1 && (
          <Button type="primary" onClick={handleNext}>Next</Button>
        )}
        {currentStep === stepKeys.length - 1 && (
          <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>Create Model</Button>
        )}
      </div>
    </Modal>
  );
}
