// src/components/projects/wizard/DetailsStep.tsx

import { Form, Input, Button, Typography } from 'antd';
import styles from './Wizard.module.css';

const { Title } = Typography;

export interface DetailsStepValues {
  id: string;
  label: string;
  description?: string;
}

interface DetailsStepProps {
  values: Partial<DetailsStepValues>;
  onChange: (values: DetailsStepValues) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DetailsStep({ values, onChange, onNext, onBack }: DetailsStepProps) {
  const [form] = Form.useForm<DetailsStepValues>();

  const handleNext = () => {
    form.validateFields().then((next) => {
      onChange(next);
      onNext();
    });
  };

  return (
    <>
      <Title level={5}>Basic info</Title>
      <p className={styles.description}>
        Enter the project ID, name, and an optional description.
      </p>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: values.id ?? '',
          label: values.label ?? '',
          description: values.description ?? '',
        }}
        onValuesChange={(_, all) => onChange(all as DetailsStepValues)}
      >
        <Form.Item
          name="id"
          label="Project ID"
          rules={[
            { required: true, message: 'Project ID is required' },
            {
              pattern: /^[a-z0-9-_]+$/i,
              message: 'Use only letters, numbers, hyphens and underscores',
            },
          ]}
        >
          <Input placeholder="e.g. marketing-site" />
        </Form.Item>
        <Form.Item
          name="label"
          label="Project name"
          rules={[{ required: true, message: 'Project name is required' }]}
        >
          <Input placeholder="e.g. Marketing Site" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={2} placeholder="Short description of the project" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack} style={{ marginRight: 8 }}>
            Back
          </Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
