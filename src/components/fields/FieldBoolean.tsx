import { Switch, Typography, Space } from 'antd';
import type { BaseFieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';

export interface FieldBooleanProps extends BaseFieldRendererProps<boolean> {
  meta?: {
    label?: string;
    onLabel?: string;
    offLabel?: string;
    size?: 'small' | 'default';
    displayMode?: 'switch' | 'text'; // 'switch' (default) or 'text'
  };
}

export function FieldBoolean({
  value,
  onChange,
  readOnly,
  meta = {},
}: FieldBooleanProps) {
  const {
    label,
    onLabel = 'Yes',
    offLabel = 'No',
    size = 'default',
    displayMode = 'switch',
  } = meta;

  const isOn = !!value;

  if (readOnly && displayMode === 'text') {
    return (
      <Typography.Text type={isOn ? undefined : 'secondary'}>
        {isOn ? onLabel : offLabel}
      </Typography.Text>
    );
  }

  return (
    <Space align="center">
      <Switch
        checked={isOn}
        onChange={readOnly ? undefined : onChange}
        disabled={readOnly}
        size={size}
        aria-label={label ?? 'Boolean toggle'}
      />
      {label && (
        <Typography.Text type="secondary" aria-hidden="true">
          {label}
        </Typography.Text>
      )}
    </Space>
  );
}

FieldRendererRegistry.register('core/boolean', FieldBoolean);
