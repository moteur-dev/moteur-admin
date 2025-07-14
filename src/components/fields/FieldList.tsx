import { Button, Space, Typography } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import type { FieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from '@/components/fields';
import classNames from 'classnames';

export interface FieldListProps extends FieldRendererProps {
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
  itemLabel?: string; // optional label for each item
  addLabel?: string;  // override for "Add item"
}

export const FieldList: React.FC<FieldListProps> = ({
  value = [],
  onChange,
  schema,
  readOnly,
  'aria-label': ariaLabel,
  className,
  style,
  'data-testid': testId = 'field-list',
  itemLabel = 'Item',
  addLabel = 'Add item',
}) => {
  const options = schema.options || {};
  const itemSchema = schema.items;

  const FieldComponent = FieldRendererRegistry.get(itemSchema?.type);

  const minItems = options.minItems ?? 0;
  const maxItems = options.maxItems ?? Infinity;
  const allowEmpty = options.allowEmpty ?? false;
  const sortable = options.sortable ?? false;

  const canAdd = value.length < maxItems;
  const canRemove = value.length > minItems;

  const handleUpdate = (index: number, newVal: any) => {
    const updated = [...value];
    updated[index] = newVal;
    onChange(updated);
  };

  const handleAdd = () => {
    if (canAdd) onChange([...value, null]);
  };

  const handleRemove = (index: number) => {
    if (canRemove) {
      const updated = value.filter((_:any, i:any) => i !== index);
      onChange(updated);
    }
  };

  const handleReorder = (from: number, to: number) => {
    if (!sortable || from === to || to < 0 || to >= value.length) return;
    const reordered = [...value];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    onChange(reordered);
  };

  return (
    <div
      className={classNames('field-list', className)}
      style={style}
      aria-label={ariaLabel ?? 'List field'}
      data-testid={testId}
    >
      {value.map((item: any, index: number) => (
        <div
          key={index}
          role="group"
          aria-label={`${itemLabel} ${index + 1}`}
          data-testid={`${testId}-item-${index}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 16,
            border: '1px solid #f0f0f0',
            padding: 12,
            borderRadius: 6,
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'start' }}>
            {FieldComponent && (
              <FieldComponent
                name={`${index}`}
                value={item}
                onChange={(val) => handleUpdate(index, val)}
                schema={itemSchema}
                readOnly={readOnly}
              />
            )}

            {!readOnly && (
              <Space direction="vertical" style={{ marginLeft: 8 }}>
                {sortable && (
                  <>
                    <Button
                      icon={<UpOutlined />}
                      size="small"
                      onClick={() => handleReorder(index, index - 1)}
                      disabled={index === 0}
                      aria-label={`Move item ${index + 1} up`}
                    />
                    <Button
                      icon={<DownOutlined />}
                      size="small"
                      onClick={() => handleReorder(index, index + 1)}
                      disabled={index === value.length - 1}
                      aria-label={`Move item ${index + 1} down`}
                    />
                  </>
                )}

                <Button
                  icon={<MinusCircleOutlined />}
                  danger
                  type="text"
                  size="small"
                  onClick={() => handleRemove(index)}
                  disabled={!canRemove}
                  aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                />
              </Space>
            )}
          </div>
        </div>
      ))}

      {!readOnly && (
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          disabled={!canAdd}
          style={{ width: '100%' }}
          aria-label="Add item"
        >
          {addLabel}
        </Button>
      )}

      {!readOnly && !allowEmpty && value.length === 0 && (
        <Typography.Text type="danger" role="alert">
          At least one item is required.
        </Typography.Text>
      )}
    </div>
  );
};

FieldRendererRegistry.register('core/list', FieldList);
