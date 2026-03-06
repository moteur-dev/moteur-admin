// src/components/project/ProjectOverview.tsx
import React from 'react'
import { Card, Skeleton, Typography, Space } from 'antd'
import { FileTextOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import styles from './ProjectOverview.module.css'

const { Title, Paragraph, Text } = Typography

function formatDate(value: string): string {
  if (!value || typeof value !== 'string') return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString()
}

export interface ProjectOverviewStats {
  pages?: number
  entries?: number
  users?: number
}

export interface ProjectOverviewProps {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  loading?: boolean
  actions?: React.ReactNode[]
  imageUrl?: string
  stats?: ProjectOverviewStats
  previewUrl?: string
  /** Default locale (e.g. "en") for display in header */
  locale?: string
}

export function ProjectOverview({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  loading = false,
  actions = [],
  imageUrl = `https://placehold.co/600x400/5E3C2C/FDF6EC?text=${name}&font=playfair-display`,
  stats,
  previewUrl,
  locale,
}: ProjectOverviewProps) {
  if (loading) {
    return <Skeleton active paragraph={{ rows: 4 }} title={{ width: '60%' }} />
  }

  return (
    <Card
      className={styles.card}
      actions={actions}
      cover={
        <div className={styles.coverWrapper}>
          <img
            src={imageUrl}
            alt={`Project "${name}" preview`}
            className={styles.coverImage}
          />
        </div>
      }
      aria-label={`Overview of project ${name}`}
    >
      <div className={styles.header}>
        <Title level={3} className={styles.title}>
          {name}
        </Title>
        <Text type="secondary" className={styles.subTitle}>
          ID: {id}
        </Text>
      </div>

      <Paragraph className={styles.description}>
        {description ?? <Text type="secondary">No description provided.</Text>}
      </Paragraph>

      {(stats || previewUrl) && (
        <div className={styles.stats}>
          {stats && (
            <Space size="middle" wrap>
              {typeof stats.pages === 'number' && (
                <Text type="secondary">
                  <FileTextOutlined /> {stats.pages} pages
                </Text>
              )}
              {typeof stats.entries === 'number' && (
                <Text type="secondary">
                  <UnorderedListOutlined /> {stats.entries} entries
                </Text>
              )}
              {typeof stats.users === 'number' && (
                <Text type="secondary">
                  <UserOutlined /> {stats.users} users
                </Text>
              )}
            </Space>
          )}
          {previewUrl && (
            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
              Preview site
            </a>
          )}
        </div>
      )}

      <div className={styles.meta}>
        {locale != null && locale !== '' && (
          <Text type="secondary">
            Locale: {locale.toUpperCase()}
          </Text>
        )}
        <Text type="secondary">
          Created: {formatDate(createdAt)}
        </Text>
        <Text type="secondary">
          Updated: {formatDate(updatedAt)}
        </Text>
      </div>
    </Card>
  )
}
