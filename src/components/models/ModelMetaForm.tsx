// components/models/ModelMetaForm.tsx
import { Form, Input, Select } from 'antd';

interface ModelMetaFormProps {
  form: any;
  readOnly?: boolean;
  style?: React.CSSProperties;
}

export function ModelMetaForm({ form, readOnly = false, style }: ModelMetaFormProps) {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ type: 'content' }}
      style={style}
      disabled={readOnly}
    >
      <Form.Item label="ID" name="id" rules={[{ required: true }]}>
        <Input placeholder="e.g. product" />
      </Form.Item>
      <Form.Item label="Label" name="label" rules={[{ required: true }]}>
        <Input placeholder="e.g. Product" />
      </Form.Item>
      <Form.Item label="Type" name="type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="content">Content</Select.Option>
          <Select.Option value="userData">User Data</Select.Option>
          <Select.Option value="taxonomy">Taxonomy</Select.Option>
          <Select.Option value="settings">Settings</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Optional" />
      </Form.Item>
    </Form>
  );
}
