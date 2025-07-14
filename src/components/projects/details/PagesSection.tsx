// src/components/project/PagesSection.tsx
import { type KeyboardEvent } from 'react'
import { Skeleton, Alert, Empty, List, Typography } from 'antd'
import styles from './PagesSection.module.css'

const { Title } = Typography

export interface PageItem {
  id: string
  title: string
  isTemplate?: boolean
}

export interface PagesSectionProps {
  pages: PageItem[]
  loading: boolean
  error?: string
  onSelectPage: (id: string) => void
}

export function PagesSection({
  pages,
  loading,
  error,
  onSelectPage,
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
      <Title level={4}>Pages &amp; Templates</Title>
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
            <span className={item.isTemplate ? styles.template : undefined}>
              {item.title}
              {item.isTemplate && <em className={styles.tag}> (template)</em>}
            </span>
          </List.Item>
        )}
      />
    </div>
  )
}
