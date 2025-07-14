// src/components/projects/wizard/AIStep.tsx
import { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'

const { Title } = Typography

interface AIStepProps {
  onNext: () => void
  onBack: () => void
}

export function AIStep({ onNext, onBack }: AIStepProps) {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (values: { prompt: string }) => {
    setLoading(true)
    // TODO: call AI endpoint
    console.log('AI prompt:', values.prompt)
    setTimeout(() => {
      setLoading(false)
      onNext()
    }, 1500)
  }

  return (
    <>
      <Title level={5}>Generate with AI</Title>
      <Form onFinish={handleGenerate} layout="vertical">
        <Form.Item
          name="prompt"
          label="Describe your project"
          rules={[{ required: true, message: 'Please enter a prompt' }]}
        >
          <Input.TextArea rows={4} placeholder="E.g. 'A marketing blog for startups...'" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack} style={{ marginRight: 8 }}>Back</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Generate
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
