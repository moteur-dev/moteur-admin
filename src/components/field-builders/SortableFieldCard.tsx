// components/field-builder/SortableFieldCard.tsx

import {
  useSortable,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Form, Tooltip } from 'antd';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { FieldEditorRegistry } from './editors/FieldEditorRegistry';
import { FIELD_TYPE_MAP } from './fieldTypes';

interface SortableFieldCardProps {
  id: string;
  field: any;
  onUpdate: (updated: any) => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

export function SortableFieldCard({
  id,
  field,
  onUpdate,
  onDelete,
  readOnly = false,
}: SortableFieldCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'default' as const,
  };

  const Editor =
    FieldEditorRegistry[field.type as keyof typeof FieldEditorRegistry] ??
    (() => <p style={{ color: 'red' }}>No editor for type: {field.type}</p>);

  const typeInfo = FIELD_TYPE_MAP[field.type];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      size="small"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            {...attributes}
            {...listeners}
            style={{ cursor: 'grab', paddingRight: 4 }}
            aria-label="Drag to reorder"
            tabIndex={0}
          >
            <RxDragHandleDots2 />
          </div>
          {typeInfo && (
            <Tooltip title={typeInfo.label}>
              <span style={{ marginLeft: 6, fontSize: 16 }}>
                {typeInfo.icon}
              </span>
            </Tooltip>
          )}
          <strong>{id}</strong>
          
        </div>
      }
      extra={
        !readOnly && (
          <Button danger size="small" onClick={onDelete}>
            Delete
          </Button>
        )
      }
    >
      <Form layout="vertical">
        <Editor field={field} onChange={onUpdate} />
      </Form>
    </Card>
  );
}
