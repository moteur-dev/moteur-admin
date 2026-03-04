import { type KeyboardEvent } from 'react';
import { Skeleton, Alert, Empty, List, Typography } from 'antd';
import type { Entry } from '@/types/Project';
import styles from './EntriesSection.module.css';

const { Title } = Typography;

export interface EntriesSectionProps {
  entries: Entry[];
  loading: boolean
  error?: string
  onSelectEntry: (id: string) => void
}

export function EntriesSection({
  entries,
  loading,
  error,
  onSelectEntry,
}: EntriesSectionProps) {
  if (loading) {
    // Show three skeleton items
    return (
      <div className={styles.section}>
        <Title level={4}>Entries</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} active paragraph={false} title={{ width: '80%' }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Alert type="error" message="Failed to load entries" description={error} showIcon />
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className={styles.section}>
        <Title level={4}>Entries</Title>
        <Empty description="No entries yet" />
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <Title level={4}>Entries</Title>
      <List
        bordered
        dataSource={entries}
        renderItem={(item) => (
          <List.Item
            className={styles.item}
            onClick={() => onSelectEntry(item.id)}
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectEntry(item.id)
              }
            }}
          >
            {item.title}
          </List.Item>
        )}
      />
    </div>
  )
}
