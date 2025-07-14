// components/field-builder/FieldBuilder.tsx

import { useState } from 'react';
import {
  Input,
  Button,
  Space,
  Typography,
  Modal,
  Segmented,
} from 'antd';
import {
  PlusOutlined,
  RobotOutlined,
  CodeOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { FieldAiAssistant } from './FieldAiAssistant';
import { JsonFieldEditor } from './JsonFieldEditor';
import { FieldTypeDropdown } from './FieldTypeDropdown';
import { SortableFieldCard } from './SortableFieldCard';

const { Title } = Typography;

export interface FieldBuilderProps {
  fields: Record<string, any>;
  onChange: (fields: Record<string, any>) => void;
  readOnly?: boolean;
  showAI?: boolean;
}

export function FieldBuilder({ fields, onChange, readOnly = false, showAI = true }: FieldBuilderProps) {
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldType, setNewFieldType] = useState('core/text');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [mode, setMode] = useState<'visual' | 'json'>('visual');

  const keys = Object.keys(fields);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleAddField = () => {
    if (!newFieldKey || fields[newFieldKey]) return;
    onChange({
      ...fields,
      [newFieldKey]: {
        type: newFieldType,
        label: newFieldKey,
      },
    });
    setNewFieldKey('');
  };

  const handleFieldUpdate = (key: string, updated: any) => {
    onChange({ ...fields, [key]: updated });
  };

  const handleDelete = (key: string) => {
    const newFields = { ...fields };
    delete newFields[key];
    onChange(newFields);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = keys.indexOf(active.id);
    const newIndex = keys.indexOf(over.id);
    const reordered = arrayMove(keys, oldIndex, newIndex);

    const newFields: Record<string, any> = {};
    for (const key of reordered) {
      newFields[key] = fields[key];
    }
    onChange(newFields);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Space
        align="center"
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          marginBottom: 16,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Fields
        </Title>
        <Segmented
          value={mode}
          onChange={(val) => setMode(val as 'visual' | 'json')}
          options={[
            { label: 'Visual', value: 'visual', icon: <AppstoreOutlined /> },
            { label: 'JSON', value: 'json', icon: <CodeOutlined /> },
          ]}
        />
      </Space>

      {mode === 'json' ? (
        <JsonFieldEditor value={fields} onChange={onChange} />
      ) : (
        <>
          {!readOnly && (
            <>
              <Space style={{ marginBottom: 16 }} wrap>
                <Input
                  placeholder="fieldName"
                  value={newFieldKey}
                  onChange={(e) => setNewFieldKey(e.target.value)}
                />
                <FieldTypeDropdown value={newFieldType} onChange={setNewFieldType} />
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddField}
                  type="primary"
                >
                  Add
                </Button>
              </Space>

              <Button
                type="default"
                icon={<RobotOutlined />}
                onClick={() => setAiModalOpen(true)}
                style={{ float: 'right', marginBottom: 16 }}
                aria-label="AI Assistant"
              />
            </>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={keys}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ display: 'grid', gap: '1rem', marginTop: 24 }}>
                {keys.map((key) => (
                  <SortableFieldCard
                    key={key}
                    id={key}
                    field={fields[key]}
                    readOnly={readOnly}
                    onUpdate={(updated) => handleFieldUpdate(key, updated)}
                    onDelete={() => handleDelete(key)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}

      {showAI && <Modal
        title="Generate Fields with AI"
        open={aiModalOpen}
        onCancel={() => setAiModalOpen(false)}
        footer={null}
        width={600}
      >
        <FieldAiAssistant
          existingFields={fields}
          onGenerate={(newFields) => {
            onChange(newFields);
            setAiModalOpen(false);
          }}
        />
      </Modal>}
    </div>
  );
}
