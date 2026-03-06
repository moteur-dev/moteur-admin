// src/components/projects/wizard/SettingsStep.tsx

import { Form, Input, Select, Button, Checkbox, Typography } from 'antd';
import type { DetailsStepValues } from './DetailsStep';

const { Title } = Typography;

export interface SettingsStepValues {
  defaultLocale: string;
  supportedLocales?: string[];
  workflowEnabled: boolean;
  workflowRequireReview: boolean;
}

const DEFAULT_LOCALE = 'en';

interface SettingsStepProps {
  details: DetailsStepValues;
  settings: Partial<SettingsStepValues>;
  onChange: (values: SettingsStepValues) => void;
  onBack: () => void;
  onNext: () => void;
}

export function SettingsStep({
  details: _details,
  settings,
  onChange,
  onBack,
  onNext,
}: SettingsStepProps) {
  const [form] = Form.useForm<SettingsStepValues>();
  const workflowEnabled = Form.useWatch('workflowEnabled', form) ?? false;

  const handleNext = () => {
    form.validateFields().then((values) => {
      onChange(values);
      onNext();
    });
  };

  return (
    <>
      <Title level={5}>Advanced options</Title>
      <p style={{ marginBottom: 16, color: 'rgba(0,0,0,0.65)' }}>
        Set default language, supported locales, and review workflow. You can change these later in
        project settings.
      </p>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          defaultLocale: settings.defaultLocale ?? DEFAULT_LOCALE,
          supportedLocales: settings.supportedLocales ?? [],
          workflowEnabled: settings.workflowEnabled ?? false,
          workflowRequireReview: settings.workflowRequireReview ?? false,
        }}
        onValuesChange={(_, all) => onChange(all as SettingsStepValues)}
      >
        <Form.Item
          name="defaultLocale"
          label="Default language"
          rules={[{ required: true, message: 'Default language is required' }]}
        >
          <Input placeholder="e.g. en" />
        </Form.Item>
        <Form.Item
          name="supportedLocales"
          label="Supported languages"
          tooltip="Other locales besides the default (e.g. fr, de)"
        >
          <Select
            mode="tags"
            placeholder="Add locales (e.g. fr, de)"
            tokenSeparators={[',']}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="workflowEnabled" valuePropName="checked">
          <Checkbox>Enable review workflow</Checkbox>
        </Form.Item>
        <Form.Item
          name="workflowRequireReview"
          valuePropName="checked"
          dependencies={['workflowEnabled']}
        >
          <Checkbox disabled={!workflowEnabled}>
            Require review before publish (authors cannot publish without approval)
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack} style={{ marginRight: 8 }}>
            Back
          </Button>
          <Button type="primary" htmlType="button" onClick={handleNext}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
