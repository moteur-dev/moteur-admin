// src/components/project/PagesSection.tsx
import { type KeyboardEvent } from 'react'
import { Skeleton, Alert, Empty, List, Typography, Tag, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { formatRelativeTime } from '@/utils/formatRelativeTime'
import styles from './PagesSection.module.css'

const { Title, Text } = Typography

export interface PageItem {
  id: string
  title: string
  isTemplate?: boolean
  status?: string
  updatedAt?: string
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'default',
  in_review: 'processing',
  published: 'success',
  unpublished: 'default',
}

export interface PagesSectionProps {
  pages: PageItem[]
  loading: boolean
  error?: string
  onSelectPage: (id: string) => void
  onAddPage?: () => void
}

export function PagesSection({
  pages,
  loading,
  error,
  onSelectPage,
  onAddPage,
}: PagesSectionProps) {
  if (loading) {
    return (
      <div className={styles.section}>
        <Title level={4}>Pages &amp; Templates</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} active paragraph={false} title={{ width: '60%' }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Alert
          type="error"
          message="Failed to load pages"
          description={error}
          showIcon
        />
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className={styles.section}>
        <Title level={4}>Pages &amp; Templates</Title>
        <Empty description="No pages or templates yet" />
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <Title level={4}>Pages &amp; Templates</Title>
        {onAddPage && (
          <Button type="link" size="small" onClick={onAddPage} icon={<PlusOutlined />}>
            Add page
          </Button>
        )}
      </div>
      <List
        bordered
        dataSource={pages}
        renderItem={(item) => (
          <List.Item
            className={styles.item}
            onClick={() => onSelectPage(item.id)}
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectPage(item.id)
              }
            }}
          >
            <span className={styles.itemContent}>
              <span className={styles.itemMain}>
                <span className={item.isTemplate ? styles.template : undefined}>
                  {item.title}
                  {item.isTemplate && <em className={styles.tag}> (template)</em>}
                </span>
                {item.updatedAt && (
                  <Text type="secondary" className={styles.relativeTime}>
                    {formatRelativeTime(item.updatedAt)}
                  </Text>
                )}
              </span>
              {item.status && (
                <span className={styles.statusWrap}>
                  <span
                    className={styles.statusDot}
                    data-status={item.status}
                    title={item.status.replace('_', ' ')}
                    aria-hidden
                  />
                  <Tag color={STATUS_COLORS[item.status] ?? 'default'} className={styles.statusTag}>
                    {item.status.replace('_', ' ')}
                  </Tag>
                </span>
              )}
            </span>
          </List.Item>
        )}
      />
    </div>
  )
}
