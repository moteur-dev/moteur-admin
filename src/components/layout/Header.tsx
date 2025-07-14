import { Avatar, Tooltip, Spin, Typography } from 'antd'
import { FiRefreshCw } from 'react-icons/fi'
import { useProjectPresence } from '@/hooks/useProjectPresence'

const { Text } = Typography


export function AppHeader() {
  const projectId = undefined // obtain via context or useParams in parent
  const { users, status, reconnect } = useProjectPresence(projectId!)

  return (
    <div>
        mO
        <Text strong>Moteur Admin</Text>

        {status === 'connecting' && <Spin size="small" />}

        {status === 'error' && (
            <Tooltip title="Reconnect">
            <FiRefreshCw style={{ cursor: 'pointer' }} onClick={reconnect} />
            </Tooltip>
        )}

        {status === 'connected' && (
            <Avatar.Group maxCount={5} size="small">
            {users.map(u => (
                <Tooltip key={u.id} title={u.name}>
                <Avatar src={u.avatarUrl} alt={u.name} />
                </Tooltip>
            ))}
            </Avatar.Group>
        )}

    </div>
  )
}
