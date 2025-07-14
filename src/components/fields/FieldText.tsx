import { Input } from 'antd';
import type { FieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';

export interface FieldTextProps extends FieldRendererProps {
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  multiline?: boolean;
  rows?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export function FieldText({
  value,
  onChange,
  readOnly,
  schema,
  placeholder,
  maxLength,
  minLength,
  multiline = false,
  rows = 3,
  autoFocus,
  disabled,
  prefix,
  suffix,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  style,
  'data-testid': testId = 'field-text',
}: FieldTextProps) {
  const inputProps = {
    value,
    onChange: (e: any) => onChange?.(e.target.value),
    readOnly,
    maxLength,
    minLength,
    placeholder,
    autoFocus,
    disabled,
    prefix,
    suffix,
    'aria-label': ariaLabel ?? schema?.label ?? 'Text field',
    'aria-describedby': ariaDescribedBy,
    className,
    style,
    'data-testid': testId,
  };
  const { prefix: _prefix, suffix:_suffix, ...textAreaProps } = inputProps;
  return multiline ? (
    <Input.TextArea rows={rows} {...textAreaProps} />
  ) : (
    <Input {...inputProps} />
  );
}

FieldRendererRegistry.register('core/text', FieldText);
