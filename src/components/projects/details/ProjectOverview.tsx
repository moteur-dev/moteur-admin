// src/components/project/ProjectOverview.tsx
import React from 'react'
import { Card, Skeleton, Typography } from 'antd'
import styles from './ProjectOverview.module.css'

const { Title, Paragraph, Text } = Typography

export interface ProjectOverviewProps {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  loading?: boolean
  actions?: React.ReactNode[]
  imageUrl?: string   // new prop
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

      <div className={styles.meta}>
        <Text type="secondary">
          Created: {new Date(createdAt).toLocaleString()}
        </Text>
        <Text type="secondary">
          Updated: {new Date(updatedAt).toLocaleString()}
        </Text>
      </div>
    </Card>
  )
}
