import { useState } from 'react';
import { Dropdown, Button, Card, Typography, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FIELD_TYPES } from './fieldTypes';

const { Text } = Typography;

export interface FieldTypeDropdownProps {
  value: string;
  onChange: (type: string) => void;
  compact?: boolean;
}

export function FieldTypeDropdown({ value, onChange, compact = false }: FieldTypeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = FIELD_TYPES.find((t) => t.type === value);
  const filtered = FIELD_TYPES.filter((field) =>
    field.label.toLowerCase().includes(search.toLowerCase()) ||
    field.type.toLowerCase().includes(search.toLowerCase())
  );

  const dropdownContent = (
    <div
      role="listbox"
      style={{
        padding: 8,
        width: 500,
        maxHeight: 400,
        overflowY: 'auto',
        display: 'grid',
        gap: 8,
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <Input
        size="small"
        placeholder="Search field types..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ gridColumn: '1 / -1', marginBottom: 8 }}
      />
      {filtered.map((field) => (
        <Card
          key={field.type}
          role="option"
          tabIndex={0}
          size="small"
          hoverable
          onClick={() => {
            onChange(field.type);
            setOpen(false);
            setSearch('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange(field.type);
              setOpen(false);
              setSearch('');
            }
          }}
          style={{
            borderColor: field.type === value ? '#1890ff' : undefined,
            backgroundColor: field.type === value ? '#e6f7ff' : undefined,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{field.icon}</span>
            <div>
              <Text strong>{field.label}</Text>
              {!compact && (
                <div style={{ fontSize: 12 }}>{field.description}</div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => dropdownContent}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Button
        icon={selected?.icon}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {selected?.label || 'Select field type'} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
