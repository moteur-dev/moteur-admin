import { Card, Typography, Button, Space, Tag, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface ModelCardProps {
  projectId: string;
  id: string;
  label: string;
  fields: Record<string, { label?: string }>;
  entryCount?: number;
  updatedAt?: string;
  imageUrl?: string;
  'data-testid'?: string;
}

export function ModelCard({
  projectId,
  id,
  label,
  fields,
  entryCount,
  updatedAt,
  imageUrl,
  'data-testid': testId = 'model-card',
}: ModelCardProps) {
  const navigate = useNavigate();
  const fieldEntries = Object.entries(fields);
  const maxVisible = 5;

  const visibleFields = fieldEntries.slice(0, maxVisible);
  const hiddenFields = fieldEntries.slice(maxVisible);

  return (
    <Card
      title={<Title level={5} style={{ marginBottom: 0 }}>{label}</Title>}
      extra={
        <Button
          type="text"
          shape="circle"
          icon={<SettingOutlined />}
          onClick={() => navigate(`/projects/${projectId}/models/${id}`)}
          aria-label={`Edit model ${label}`}
        />
      }
      cover={imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={{ objectFit: 'cover', height: 140 }}
        />
      )}
      style={{ width: 260, flex: 1, display: 'flex', flexDirection: 'column' }}
      hoverable
      data-testid={testId}
    >
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {visibleFields.map(([key, def]) => (
          <Tag key={key}>{def.label || key}</Tag>
        ))}

        {hiddenFields.length > 0 && (
          <Tooltip
            title={hiddenFields.map(([key, def]) => def.label || key).join(', ')}
            placement="top"
          >
            <Tag>+{hiddenFields.length} more</Tag>
          </Tooltip>
        )}

        {fieldEntries.length === 0 && (
          <Text type="secondary">No fields</Text>
        )}
      </div>

      <Space direction="vertical" size={6} style={{ width: '100%' }}>
        <Button
          type="primary"
          block
          onClick={() => navigate(`/projects/${projectId}/models/${id}/entries`)}
        >
          View Entries
        </Button>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {fieldEntries.length} fields • {entryCount ?? '—'} entries
        </Text>
        {updatedAt && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Last updated: {new Date(updatedAt).toLocaleDateString()}
          </Text>
        )}
      </Space>
    </Card>
  );
}
