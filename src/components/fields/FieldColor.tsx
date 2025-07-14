import { ColorPicker, Typography, Space } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { FieldRendererRegistry } from './FieldRendererRegistry';
import type { BaseFieldRendererProps } from './FieldRendererProps';

export interface FieldColorProps extends BaseFieldRendererProps<string> {
  meta?: {
    format?: 'hex' | 'rgb' | 'hsl';
    displayMode?: 'picker' | 'swatch';
    showText?: boolean;
    compact?: boolean;
    size?: 'small' | 'default';
    label?: string;
  };
}

export const FieldColor: React.FC<FieldColorProps> = ({
  value,
  onChange,
  readOnly,
  meta = {},
}) => {
  const {
    displayMode = 'picker',
    format = 'hex',
    showText = true,
    size = 'default',
    label,
  } = meta;

  const parsedColor = typeof value === 'string' ? value : '#000000';

  if (readOnly && displayMode === 'swatch') {
    return (
      <Space align="center">
        <div
          role="img"
          aria-label={`Color swatch: ${parsedColor}`}
          style={{
            width: size === 'small' ? 12 : 20,
            height: size === 'small' ? 12 : 20,
            backgroundColor: parsedColor,
            borderRadius: 4,
            border: '1px solid #ddd',
          }}
        />
        {label && (
          <Typography.Text type="secondary" aria-hidden="true">
            {label}
          </Typography.Text>
        )}
      </Space>
    );
  }

  return (
    <ColorPicker
      value={parsedColor}
      onChangeComplete={(color: Color) => {
        const hex = color.toHexString();
        const rgb = color.toRgbString();
        const hsl = color.toHsbString(); // hsl and hsb map similarly

        const result =
          format === 'hex' ? hex : format === 'rgb' ? rgb : hsl;

        onChange?.(result);
      }}
      disabled={readOnly}
      showText={showText}
      //format={format} 
      placement="topLeft"
      presets={[]}
      panelRender={undefined}
    />
  );
};

FieldRendererRegistry.register('core/color', FieldColor);
