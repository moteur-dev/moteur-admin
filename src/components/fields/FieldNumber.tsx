import { InputNumber } from 'antd';
import type { FieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';

export interface FieldNumberProps extends FieldRendererProps {
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export function FieldNumber({
  value,
  onChange,
  readOnly,
  min,
  max,
  step,
  placeholder,
  className,
  style,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: FieldNumberProps) {
  return (
    <InputNumber
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      className={className}
      style={{ width: '100%', ...style }}
      aria-label={ariaLabel ?? 'Numeric input'}
      data-testid={testId}
    />
  );
}

FieldRendererRegistry.register('core/number', FieldNumber);
