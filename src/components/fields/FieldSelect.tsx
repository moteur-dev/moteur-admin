import { Select, Typography, Space, Tag } from 'antd';
import { FieldRendererRegistry } from './FieldRendererRegistry';
import type { BaseFieldRendererProps } from './FieldRendererProps';

export interface FieldSelectProps extends BaseFieldRendererProps<string | string[]> {
  meta?: {
    mode?: 'select' | 'tags' | 'inline' | 'readonly';
    multiple?: boolean;
    allowClear?: boolean;
    size?: 'small' | 'default' | 'large';
    showSearch?: boolean;
    placeholder?: string;
    label?: string;
    options?: Array<
      | string
      | {
          value: string;
          label?: string;
          color?: string;
          group?: string;
        }
    >;
  };
}

type RawOption =
  | string
  | {
      value: string;
      label?: string;
      color?: string;
      group?: string;
    };

type NormalizedOption = {
  value: string;
  label: string;
  color?: string;
  group?: string;
};

function normalizeOptions(
  options: RawOption[] = []
): NormalizedOption[] {
  return options.map((opt) =>
    typeof opt === 'string'
      ? { value: opt, label: opt }
      : {
          value: opt.value,
          label: opt.label ?? opt.value,
          color: opt.color,
          group: opt.group,
        }
  );
}
export const FieldSelect: React.FC<FieldSelectProps> = ({
  value,
  onChange,
  readOnly,
  schema,
}) => {
  const {
    options = [],
    multiple = false,
    allowClear = true,
    size = 'default',
    mode = 'select',
    placeholder = 'Select...',
    showSearch = true,
    label,
  } = schema?.meta ?? {};

  const normalized = normalizeOptions(options);
  const isMulti = multiple || Array.isArray(value);
  const modeToUse = readOnly ? 'readonly' : mode;

  // Read-only rendering
  if (modeToUse === 'readonly' || modeToUse === 'inline') {
    const values = isMulti ? (Array.isArray(value) ? value : []) : [value];

    const content = values.length
      ? values.map((val) => {
          const opt = normalized.find((o) => o.value === val);
          return (
            <Tag key={val} color={opt?.color ?? undefined}>
              {opt?.label ?? val}
            </Tag>
          );
        })
      : <Typography.Text type="secondary">–</Typography.Text>;

    return (
      <Space wrap size="small">
        {label && <Typography.Text type="secondary">{label}:</Typography.Text>}
        {content}
      </Space>
    );
  }

  // Editable <Select /> rendering
  return (
    <Select
      mode={mode === 'tags' || isMulti ? 'multiple' : undefined}
      value={value}
      onChange={onChange}
      options={normalized}
      allowClear={allowClear}
      size={size}
      placeholder={placeholder}
      showSearch={showSearch}
      style={{ minWidth: 120 }}
    />
  );
};

FieldRendererRegistry.register('core/select', FieldSelect);
