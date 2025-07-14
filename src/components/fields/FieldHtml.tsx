// components/fields/FieldHtml.tsx
import { Typography } from 'antd';
import { FieldRendererRegistry } from './FieldRendererRegistry';
import type { BaseFieldRendererProps } from './FieldRendererProps';
import { RichTextEditor } from './RichTextEditor';

export interface FieldHtmlProps extends BaseFieldRendererProps<string> {
  meta?: {
    displayMode?: 'editor' | 'preview';
    toolbar?: boolean;
    height?: number;
    compact?: boolean;
    label?: string;
  };
}

export const FieldHtml: React.FC<FieldHtmlProps> = ({
  value,
  onChange,
  readOnly,
  meta = {},
}) => {
  const {
    displayMode = 'editor',
    toolbar = true,
    height = 240,
    compact = false,
    label,
  } = meta;

  const isPreview = readOnly || displayMode === 'preview';

  if (isPreview) {
    return (
      <div style={{ minHeight: height, border: '1px solid #f0f0f0', padding: 12 }}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <div
          dangerouslySetInnerHTML={{ __html: value ?? '' }}
          aria-label={label}
        />
      </div>
    );
  }

  return (
    <RichTextEditor
      value={value ?? ''}
      onChange={onChange}
      height={height}
      toolbar={toolbar}
      compact={compact}
    />
  );
};

FieldRendererRegistry.register('core/html', FieldHtml);
