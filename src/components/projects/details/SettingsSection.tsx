// src/components/project/SettingsSection.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Skeleton, Alert, Typography, Button, Form, Input, List } from 'antd'
import styles from './SettingsSection.module.css'

const { Title, Paragraph } = Typography

export interface SettingsSectionProps {
  settings?: Record<string, any>
  loading: boolean
  error?: string
  onSave?: (newSettings: Record<string, any>) => void
}

export function SettingsSection({
  settings = {},
  loading,
  error,
  onSave,
}: SettingsSectionProps) {
  const [editing, setEditing] = useState(false)
  const [form] = Form.useForm<{ json: string }>()

  // Initialize the form when entering edit mode
  const startEdit = () => {
    form.setFieldsValue({ json: JSON.stringify(settings, null, 2) })
    setEditing(true)
  }
  const cancelEdit = () => setEditing(false)

  const handleSave = async () => {
    try {
      const { json } = await form.validateFields()
      const parsed = JSON.parse(json)
      onSave?.(parsed)
      setEditing(false)
    } catch (error) {
      // validation or JSON parse errors will be shown by Form.Item
      console.error('Failed to save settings:', error)
    }
  }

  if (loading) {
    return <Skeleton active paragraph={{ rows: 4 }} title={{ width: '40%' }} />
  }

  if (error) {
    return <Alert type="error" message="Failed to load settings" description={error} showIcon />
  }

  return (
    <div className={styles.section}>
      <Title level={4}>Settings</Title>

      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 2 }}>
          <Title level={5}>Configuration</Title>
          <List>
            <List.Item><Link to="/settings/configuration/billing">Billing &amp; Plan</Link></List.Item>
            <List.Item><Link to="/settings/configuration/permissions">Users &amp; Permissions</Link></List.Item>
            <List.Item><Link to="/settings/configuration/features">Features list</Link></List.Item>
            <List.Item><Link to="/settings/configuration/plugins">Plugins</Link></List.Item>
          </List>
        </Col>

        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 2 }}>
          <Title level={5}>Customization</Title>
          <List>
            <List.Item><Link to="/settings/customization/fields">Custom Fields</Link></List.Item>
            <List.Item><Link to="/settings/customization/blocks">Blocks Library</Link></List.Item>
            <List.Item><Link to="/settings/customization/models">Models</Link></List.Item>
            <List.Item><Link to="/settings/customization/templates">Templates</Link></List.Item>
            <List.Item><Link to="/settings/customization/blueprints">Blueprints Manager</Link></List.Item>
          </List>
        </Col>
      </Row>


      {!editing && (
        <Card className={styles.card}>
          {Object.keys(settings).length === 0 ? (
            <Paragraph type="secondary">No settings defined.</Paragraph>
          ) : (
            <pre className={styles.pre}>{JSON.stringify({"foo": "bar"}, null, 2)}</pre>
          )}
          {onSave && (
            <Button type="primary" onClick={startEdit}>
              Edit Settings
            </Button>
          )}
        </Card>
      )}

      {editing && (
        <Card className={styles.card}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="json"
              label="Settings JSON"
              rules={[
                { required: true, message: 'Please enter valid JSON' },
                {
                  validator: (_, value) => {
                    try {
                      JSON.parse(value)
                      return Promise.resolve()
                    } catch {
                      return Promise.reject(new Error('Invalid JSON format'))
                    }
                  },
                },
              ]}
            >
              <Input.TextArea rows={10} className={styles.textArea} />
            </Form.Item>

            <div className={styles.actions}>
              <Button onClick={cancelEdit}>Cancel</Button>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </div>
  )
}
