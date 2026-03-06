// src/components/project/UsersSection.tsx

import { Skeleton, Alert, Empty, List, Avatar, Typography, Badge, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './UsersSection.module.css'
import type { OnlineUser } from '@/hooks/useProjectPresence'

const { Title, Text } = Typography

export interface UsersSectionProps {
  authorizedUsers: any //{ id: string; name: string; avatarUrl?: string }[]
  onlineUsers: OnlineUser[]
  loading: boolean
  error?: string
  onAddUser?: () => void
}

export function UsersSection({
  authorizedUsers,
  onlineUsers,
  loading,
  error,
  onAddUser,
}: UsersSectionProps) {
  if (loading) {
    return (
      <div className={styles.section}>
        <Title level={4}>Users</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            avatar
            paragraph={false}
            title={{ width: '40%' }}
            active
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Alert
          type="error"
          message="Failed to load users"
          description={error}
          showIcon
        />
      </div>
    )
  }

  if (authorizedUsers.length === 0) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Title level={4}>Users</Title>
          {onAddUser && (
            <Button type="link" size="small" onClick={onAddUser} icon={<PlusOutlined />}>
              Invite user
            </Button>
          )}
        </div>
        <Empty description="No authorized users" />
      </div>
    )
  }

  const onlineIds = new Set(onlineUsers.map((u) => u.id))

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <Title level={4}>Users</Title>
        {onAddUser && (
          <Button type="link" size="small" onClick={onAddUser} icon={<PlusOutlined />}>
            Invite user
          </Button>
        )}
      </div>
      <List
        itemLayout="horizontal"
        dataSource={authorizedUsers}
        renderItem={(user: any) => {
          const isOnline = onlineIds.has(user.id)
          return (
            <List.Item className={styles.item}>
              <List.Item.Meta
                avatar={
                  <Badge
                    dot={isOnline}
                    offset={[0, 40]}
                    title={isOnline ? 'Online' : 'Offline'}
                  >
                    <Avatar src={user.avatarUrl} icon={!user.avatarUrl && <Text>{user.name?.[0] ?? '?'}</Text>} />
                  </Badge>
                }
                title={
                  <span className={styles.userTitle}>
                    {user.name}
                    {user.roles?.[0] && (
                      <Text type="secondary" className={styles.role}>
                        {' '}
                        {user.roles[0].toUpperCase()}
                      </Text>
                    )}
                  </span>
                }
                description={
                  isOnline ? (
                    <Text type="success">Online now</Text>
                  ) : (
                    <Text type="secondary">Offline</Text>
                  )
                }
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}
