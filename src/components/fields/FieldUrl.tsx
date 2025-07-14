// components/field-builder/renderers/FieldUrl.tsx

import { Input, Space, Tooltip, Button } from 'antd';
import {
  LinkOutlined,
  CopyOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { FieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';
import { useState } from 'react';

export interface FieldUrlProps extends FieldRendererProps {
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

export function FieldUrl({
  value = '',
  onChange,
  readOnly,
  schema,
  placeholder,
  autoFocus,
  disabled,
  prefix = <LinkOutlined />,
  suffix,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': testId = 'field-url',
}: FieldUrlProps) {
  const [copied, setCopied] = useState(false);

  const isValidUrl = /^https?:\/\/.+\..+/.test(value);
  const isInsecure = value?.startsWith('http://');

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleBlur = () => {
    if (value && !/^https?:\/\//.test(value)) {
      onChange?.(`https://${value}`);
    }
  };

  const defaultSuffix = (
    <Space size="small">
      {isInsecure && (
        <Tooltip title="This link is not secure (http)">
          <ExclamationCircleOutlined style={{ color: '#faad14', opacity: 0.7 }} />
        </Tooltip>
      )}

      {isValidUrl && (
        <Tooltip title="Open link">
          <Button
            size="small"
            icon={<EyeOutlined />}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          />
        </Tooltip>
      )}

      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <Button size="small" icon={<CopyOutlined />} onClick={handleCopy} tabIndex={-1} />
      </Tooltip>
    </Space>
  );

  return (
    <Input
      type="url"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={handleBlur}
      readOnly={readOnly}
      disabled={disabled}
      autoFocus={autoFocus}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix ?? defaultSuffix}
      className={className}
      style={style}
      aria-label={ariaLabel ?? schema?.label ?? 'URL field'}
      aria-describedby={ariaDescribedBy}
      data-testid={testId}
    />
  );
}

FieldRendererRegistry.register('core/url', FieldUrl);
