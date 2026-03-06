import { type KeyboardEvent } from 'react';
import { Skeleton, Alert, Empty, List, Typography, Collapse, Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { EntriesByModelGroup, EntryWithModel } from '@/hooks/useEntriesByModel';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import styles from './EntriesSection.module.css';

const { Title, Text } = Typography;

export interface EntriesSectionProps {
  groups: EntriesByModelGroup[];
  loading: boolean;
  error?: string;
  onSelectEntry: (modelId: string, entryId: string) => void;
  onAddEntry?: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'default',
  in_review: 'processing',
  published: 'success',
  unpublished: 'default',
};

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className={styles.statusWrap}>
      <span
        className={styles.statusDot}
        data-status={status}
        title={status.replace('_', ' ')}
        aria-hidden
      />
      <Tag color={STATUS_COLORS[status] ?? 'default'} className={styles.statusTag}>
        {status.replace('_', ' ')}
      </Tag>
    </span>
  );
}

function EntryItem({
  item,
  onSelect,
}: {
  item: EntryWithModel;
  onSelect: () => void;
}) {
  return (
    <List.Item
      className={styles.item}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <span className={styles.entryContent}>
        <span className={styles.entryTitle}>{item.title}</span>
        {item.updatedAt && (
          <Text type="secondary" className={styles.relativeTime}>
            {formatRelativeTime(item.updatedAt)}
          </Text>
        )}
      </span>
      <StatusBadge status={item.status} />
    </List.Item>
  );
}

export function EntriesSection({
  groups,
  loading,
  error,
  onSelectEntry,
  onAddEntry,
}: EntriesSectionProps) {
  if (loading) {
    return (
      <div className={styles.section}>
        <Title level={4}>Entries</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} active paragraph={false} title={{ width: '80%' }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Alert type="error" message="Failed to load entries" description={error} showIcon />
      </div>
    );
  }

  const hasAnyEntries = groups.some((g) => g.entries.length > 0);
  if (!hasAnyEntries) {
    return (
      <div className={styles.section}>
        <Title level={4}>Entries</Title>
        <Empty description="No entries yet" />
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <Title level={4}>Entries</Title>
        {onAddEntry && (
          <Button type="link" size="small" onClick={() => onAddEntry()} icon={<PlusOutlined />}>
            Add entry
          </Button>
        )}
      </div>
      <Collapse
        defaultActiveKey={groups.map((g) => g.modelId)}
        items={groups
          .filter((g) => g.entries.length > 0)
          .map((group) => ({
            key: group.modelId,
            label: `${group.modelLabel} (${group.entries.length})`,
            children: (
              <List
                bordered
                size="small"
                dataSource={group.entries}
                renderItem={(item) => (
                  <EntryItem
                    key={item.id}
                    item={item}
                    onSelect={() => onSelectEntry(group.modelId, item.id)}
                  />
                )}
              />
            ),
          }))}
      />
    </div>
  );
}
