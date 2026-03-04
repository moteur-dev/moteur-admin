// src/components/projects/wizard/EmptyStep.tsx

import { useState } from 'react'
import { Form, Input, Button, Typography, message, Alert, Select, Collapse } from 'antd'
import { api } from '@/utils/apiClient'

const { Title } = Typography

const COMMON_LOCALES = [
  { value: 'en', label: 'English (en)' },
  { value: 'fr', label: 'French (fr)' },
  { value: 'de', label: 'German (de)' },
  { value: 'es', label: 'Spanish (es)' },
  { value: 'it', label: 'Italian (it)' },
  { value: 'pt', label: 'Portuguese (pt)' },
  { value: 'nl', label: 'Dutch (nl)' },
  { value: 'ja', label: 'Japanese (ja)' },
  { value: 'zh', label: 'Chinese (zh)' },
  { value: 'ar', label: 'Arabic (ar)' },
]

interface EmptyStepProps {
  onBack: () => void
  onFinish: () => void
  onProjectCreated?: (projectId: string, label: string) => void
}

interface FormValues {
  name: string
  label: string
  defaultLocale?: string
  supportedLocales?: string[]
}

export function EmptyStep({ onBack, onFinish, onProjectCreated }: EmptyStepProps) {
  const [form] = Form.useForm<FormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (values: FormValues) => {
    setSubmitting(true)
    setError(null)
    const defaultLocale = (values.defaultLocale ?? '').trim() || 'en'
    const supportedLocales = values.supportedLocales?.filter(Boolean)
    try {
      const res = await api.post<{ id: string; label: string }>('/projects', {
        id: values.name,
        label: values.label,
        defaultLocale,
        ...(supportedLocales?.length ? { supportedLocales } : {}),
      })
      const project = res.data
      const label = project.label ?? values.label
      message.success(`Project "${label}" created. You have been assigned to it.`)
      onProjectCreated?.(project.id, label)
      onFinish()
    } catch (err: any) {
      const msg = err.response?.data?.error ?? err.message ?? 'Failed to create project'
      setError(msg)
      message.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Title level={5}>Start an Empty Project</Title>
      {error && (
        <Alert
          type="error"
          message="Project creation failed"
          description={error}
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        form={form}
        onFinish={handleCreate}
        layout="vertical"
        initialValues={{ defaultLocale: 'en' }}
      >
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
        <Collapse
          ghost
          items={[
            {
              key: 'advanced',
              label: 'Advanced',
              children: (
                <>
                  <Form.Item
                    name="defaultLocale"
                    label="Default language"
                    help="Locale code for the default language (e.g. en, fr). Defaults to en if empty."
                  >
                    <Select
                      placeholder="en"
                      allowClear
                      showSearch
                      optionFilterProp="label"
                      options={COMMON_LOCALES}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="supportedLocales"
                    label="Other languages"
                    help="Optional. Add other locale codes this project will support."
                  >
                    <Select
                      mode="tags"
                      placeholder="e.g. fr, de, es"
                      tokenSeparators={[',']}
                      style={{ width: '100%' }}
                      options={COMMON_LOCALES.map(({ value }) => ({ value, label: value }))}
                    />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />
        <Form.Item>
          <Button onClick={onBack} style={{ marginRight: 8 }} disabled={submitting}>
            Back
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
