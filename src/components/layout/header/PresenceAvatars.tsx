// src/components/layout/header/PresenceAvatars.tsx
import { Avatar, Tooltip, Spin } from 'antd'
import { FiRefreshCw } from 'react-icons/fi'
import type { OnlineUser, PresenceStatus } from '@/hooks/useProjectPresence'

interface PresenceAvatarsProps {
  users: OnlineUser[]
  status: PresenceStatus
  onReconnect: () => void
}

export function PresenceAvatars({ users, status, onReconnect }: PresenceAvatarsProps) {
  if (status === 'connecting') {
    return <Spin size="small" />
  }
  if (status === 'error') {
    return (
      <Tooltip title="Connection lost, retry">
        <FiRefreshCw onClick={onReconnect} style={{ cursor: 'pointer' }} aria-label="Retry presence" />
      </Tooltip>
    )
  }
  return (
    <Avatar.Group maxCount={4}>
      {users.map(u => (
        <Tooltip key={u.id} title={u.name}>
          <Avatar src={u.avatarUrl} alt={u.name} size={'large'} shape='square' />
        </Tooltip>
      ))}
    </Avatar.Group>
  )
}
