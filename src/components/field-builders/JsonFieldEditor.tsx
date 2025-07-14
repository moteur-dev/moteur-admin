// components/field-builder/JsonFieldEditor.tsx

import { useState, useEffect } from 'react';
import { Alert, Typography, Button, Space, Modal } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { RobotOutlined } from '@ant-design/icons';
import { FieldAiAssistant } from './FieldAiAssistant';

const { Text } = Typography;

export interface JsonFieldEditorProps {
  value: Record<string, any>;
  onChange: (json: Record<string, any>) => void;
  readOnly?: boolean;
  showAI?: boolean;

}

export function JsonFieldEditor({ value, onChange, showAI }: JsonFieldEditorProps) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    try {
      const parsed = JSON.parse(newText);
      setError(null);
      onChange(parsed);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFormat = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(text), null, 2);
      setText(formatted);
      setError(null);
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor
        value={text}
        language="json"
        placeholder="Paste your JSON here"
        onChange={(e) => handleChange(e.target.value)}
        padding={16}
        style={{
          fontSize: 14,
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: 'monospace',
          borderRadius: 8,
          width: '100%',
          minHeight: 300,
        }}
      />

      <Button
        type="default"
        icon={<RobotOutlined />}
        onClick={() => setAiModalOpen(true)}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 100,
        }}
        aria-label="Generate fields with AI"
      />

      {showAI && <Modal
        title="Generate Fields with AI"
        open={aiModalOpen}
        onCancel={() => setAiModalOpen(false)}
        footer={null}
        width={600}
      >
        <FieldAiAssistant
          existingFields={value}
          onGenerate={(newFields) => {
            setText(JSON.stringify(newFields, null, 2));
            onChange(newFields);
            setAiModalOpen(false);
          }}
        />
      </Modal>}

      <Space direction="vertical" style={{ marginTop: 16, width: '100%' }}>
        {error ? (
          <Alert type="error" message="Invalid JSON" description={error} showIcon />
        ) : (
          <Text type="success">Valid JSON</Text>
        )}
        <Button onClick={handleFormat}>Format JSON</Button>
      </Space>
    </div>
  );
}
