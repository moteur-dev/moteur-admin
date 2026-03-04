import { type KeyboardEvent } from 'react';
import { Skeleton, Alert, Empty, List, Typography } from 'antd';
import type { LayoutItem } from '@/types/Project';
import styles from './LayoutsSection.module.css';

const { Title } = Typography;

export interface LayoutsSectionProps {
  layouts: LayoutItem[];
  loading: boolean
  error?: string
  onSelectLayout: (id: string) => void
}

export function LayoutsSection({
  layouts,
  loading,
  error,
  onSelectLayout,
}: LayoutsSectionProps) {
  if (loading) {
    return (
      <div className={styles.section}>
        <Title level={4}>Layouts</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} active paragraph={false} title={{ width: '70%' }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Alert type="error" message="Failed to load layouts" description={error} showIcon />
      </div>
    )
  }

  if (layouts.length === 0) {
    return (
      <div className={styles.section}>
        <Title level={4}>Layouts</Title>
        <Empty description="No layouts yet" />
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <Title level={4}>Layouts</Title>
      <List
        bordered
        dataSource={layouts}
        renderItem={(item) => (
          <List.Item
            className={styles.item}
            onClick={() => onSelectLayout(item.id)}
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectLayout(item.id)
              }
            }}
          >
            {item.name}
          </List.Item>
        )}
      />
    </div>
  )
}
