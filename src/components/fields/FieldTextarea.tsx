import { Input } from 'antd';
import type { FieldRendererProps } from '././FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';

export const FieldTextarea: React.FC<FieldRendererProps> = ({ value, onChange, readOnly }) => {
  return (
    <Input.TextArea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
    />
  );
};

FieldRendererRegistry.register('core/textarea', FieldTextarea);