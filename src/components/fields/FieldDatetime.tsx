import { DatePicker, Typography, Space } from 'antd';
import { FieldRendererRegistry } from './FieldRendererRegistry';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

import type { BaseFieldRendererProps } from './FieldRendererProps';

export interface FieldDatetimeProps extends BaseFieldRendererProps<string | null> {
  meta?: {
    mode?: 'datetime' | 'date' | 'time';
    format?: string;
    placeholder?: string;
    displayFormat?: string;
    locale?: string;
    showNow?: boolean;
    label?: string;
  };
}

export const FieldDatetime: React.FC<FieldDatetimeProps> = ({
  value,
  onChange,
  readOnly,
  meta = {},
}) => {
  const {
    mode = 'datetime',
    format,
    placeholder,
    displayFormat = 'LLL',
    locale = 'en',
    showNow = true,
    label,
  } = meta;

  const parsedValue = value ? dayjs(value) : null;

  const pickerType = mode === 'date' ? 'date' : mode === 'time' ? 'time' : 'date';

  if (readOnly) {
    return (
      <Space>
        <Typography.Text>
          {parsedValue ? parsedValue.locale(locale).format(displayFormat) : '—'}
        </Typography.Text>
        {label && <Typography.Text type="secondary" aria-hidden>{label}</Typography.Text>}
      </Space>
    );
  }

  return (
    <DatePicker
      picker={pickerType}
      showTime={mode === 'datetime'}
      style={{ width: '100%' }}
      value={parsedValue}
      onChange={(val) => onChange?.(val?.toISOString() ?? null)}
      disabled={readOnly}
      placeholder={placeholder}
      format={format}
      showNow={showNow}
    />
  );
};

FieldRendererRegistry.register('core/datetime', FieldDatetime);
