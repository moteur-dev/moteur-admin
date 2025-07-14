// src/components/projects/wizard/EmptyStep.tsx

import { Form, Input, Button, Typography } from 'antd'

const { Title } = Typography

interface EmptyStepProps {
  onBack: () => void
  onFinish: () => void
}

export function EmptyStep({ onBack, onFinish }: EmptyStepProps) {
  const [form] = Form.useForm<{ name: string; label: string }>()

  const handleCreate = (values: { name: string; label: string }) => {
    // TODO: call API to create empty project
    console.log('Create empty project', values)
    onFinish()
  }

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
          <Button type="primary" htmlType="submit">Create</Button>
        </Form.Item>
      </Form>
    </>
  )
}
