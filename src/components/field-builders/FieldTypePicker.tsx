// components/field-builder/FieldTypePicker.tsx

import { Card, Typography } from 'antd';
import { FIELD_TYPES } from './fieldTypes';

const { Text } = Typography;

export interface FieldTypePickerProps {
  value: string;
  onChange: (type: string) => void;
}

export function FieldTypePicker({ value, onChange }: FieldTypePickerProps) {
  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {FIELD_TYPES.map((field) => {
        const selected = value === field.type;

        return (
          <Card
            key={field.type}
            onClick={() => onChange(field.type)}
            style={{
              cursor: 'pointer',
              borderColor: selected ? '#1890ff' : undefined,
              backgroundColor: selected ? '#e6f7ff' : undefined,
            }}
            hoverable
            size="small"
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>{field.icon}</span>
              <div>
                <Text strong>{field.label}</Text>
                <div style={{ fontSize: 12 }}>{field.description}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
