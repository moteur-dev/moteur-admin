// components/model/ModelTypeSelector.tsx

import { Form } from 'antd';
import { FiFileText, FiUser, FiTag, FiSettings } from 'react-icons/fi';

const OPTIONS = [
  {
    value: 'content',
    icon: <FiFileText size={20} />,
    label: 'Content',
    description:
      'Regular content, typically entered by editors in the backend.',
  },
  {
    value: 'userData',
    icon: <FiUser size={20} />,
    label: 'User Data',
    description:
      'From frontend, typically submitted through forms or user actions.',
  },
  {
    value: 'taxonomy',
    icon: <FiTag size={20} />,
    label: 'Taxonomy',
    description: 'Categories, Tags, Filters, and related structures.',
  },
  {
    value: 'settings',
    icon: <FiSettings size={20} />,
    label: 'Settings',
    description: 'Special object that holds configuration data.',
  },
];

export function ModelTypeSelector() {
  const form = Form.useFormInstance();
  const selected = Form.useWatch('type', form); // ✅ reactive watch

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      {OPTIONS.map((item) => {
        const isSelected = item.value === selected;
        return (
          <div
            key={item.value}
            onClick={() => form.setFieldValue('type', item.value)}
            style={{
              border: isSelected ? '2px solid #1890ff' : '1px solid #d9d9d9',
              backgroundColor: isSelected ? '#e6f7ff' : '#fff',
              borderRadius: 6,
              padding: 12,
              cursor: 'pointer',
              transition: 'border 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span>{item.icon}</span>
              <div>
                <strong>{item.label}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>{item.description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
