import { Input, Tag, Tooltip, theme, Flex } from 'antd';
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import type { FieldRendererProps } from './FieldRendererProps';
import { FieldRendererRegistry } from './FieldRendererRegistry';

export interface FieldTagsProps extends FieldRendererProps {
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  allowEdit?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'data-testid'?: string;
}

export const FieldTags: React.FC<FieldTagsProps> = ({
  value = [],
  onChange,
  readOnly,
  placeholder = 'New tag',
  maxTags,
  allowDuplicates = false,
  allowEdit = true,
  className,
  style,
  'aria-label': ariaLabel = 'Tag input',
  'data-testid': testId = 'field-tags',
}) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editRef = useRef<InputRef>(null);

  useEffect(() => setTags(value), [value]);

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus();
  }, [inputVisible]);

  useEffect(() => {
    if (editIndex !== -1) editRef.current?.focus();
  }, [editIndex]);

  const confirmInput = () => {
    const trimmed = inputValue.trim();
    if (
      trimmed &&
      (allowDuplicates || !tags.includes(trimmed)) &&
      (!maxTags || tags.length < maxTags)
    ) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      onChange(newTags);
    }
    setInputValue('');
    setInputVisible(false);
  };

  const cancelInput = () => {
    setInputValue('');
    setInputVisible(false);
  };

  const confirmEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      const updated = [...tags];
      updated[editIndex] = trimmed;
      setTags(updated);
      onChange(updated);
    }
    setEditIndex(-1);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditValue('');
  };

  const handleRemove = (removed: string) => {
    const updated = tags.filter(tag => tag !== removed);
    setTags(updated);
    onChange(updated);
  };

  return (
    <Flex
      wrap
      gap="4px"
      className={className}
      style={style}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {tags.map((tag, index) => {
        const long = tag.length > 20;
        const tagNode = (
          <Tag
            key={tag}
            closable={!readOnly}
            style={{ userSelect: 'none' }}
            onClose={() => handleRemove(tag)}
            data-testid={`${testId}-tag-${index}`}
          >
            <span
              onDoubleClick={() => {
                if (!readOnly && allowEdit) {
                  setEditIndex(index);
                  setEditValue(tag);
                }
              }}
            >
              {long ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );

        if (editIndex === index) {
          return (
            <Input
              ref={editRef}
              key={`edit-${tag}`}
              size="small"
              style={{ width: 100 }}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={confirmEdit}
              onPressEnter={confirmEdit}
              onKeyDown={(e) => e.key === 'Escape' && cancelEdit()}
              data-testid={`${testId}-edit-${index}`}
            />
          );
        }

        return long ? <Tooltip title={tag}>{tagNode}</Tooltip> : tagNode;
      })}

      {!readOnly && (inputVisible ? (
        <Input
          ref={inputRef}
          size="small"
          style={{ width: 100 }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={confirmInput}
          onPressEnter={confirmInput}
          onKeyDown={(e) => e.key === 'Escape' && cancelInput()}
          placeholder={placeholder}
          data-testid={`${testId}-input`}
        />
      ) : (
        <Tag
          icon={<PlusOutlined />}
          onClick={() => setInputVisible(true)}
          style={{
            height: 22,
            background: token.colorBgContainer,
            borderStyle: 'dashed',
            userSelect: 'none',
          }}
          data-testid={`${testId}-add`}
        >
          {placeholder}
        </Tag>
      ))}
    </Flex>
  );
};

FieldRendererRegistry.register('core/tags', FieldTags);
