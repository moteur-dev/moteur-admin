// src/components/layout/header/NotificationBell.tsx
import { Badge, Dropdown, Menu } from 'antd'
import { FiBell } from 'react-icons/fi'
import { useState } from 'react'

interface Notification {
  id: string
  text: string
}

const mockNotifs: Notification[] = [
  { id: 'n1', text: 'Alice commented on Entry X' },
  { id: 'n2', text: 'Bob created a new layout' },
]

export function NotificationBell() {
  const [notifs] = useState<Notification[]>(mockNotifs)

  const menu = (
    <Menu>
      {notifs.map(n => (
        <Menu.Item key={n.id}>{n.text}</Menu.Item>
      ))}
      {notifs.length === 0 && <Menu.Item disabled>No notifications</Menu.Item>}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Badge count={notifs.length} offset={[0, 0]}>
        <FiBell style={{ fontSize: 20, cursor: 'pointer' }} aria-label="Notifications" />
      </Badge>
    </Dropdown>
  )
}
