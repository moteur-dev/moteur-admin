// src/components/layout/Header.tsx
import { Layout } from 'antd'
import styles from './Header.module.css'
import { ToggleSidebarButton } from './/ToggleSidebarButton'
import { BreadcrumbNav } from './BreadcrumbNav'
import { PresenceAvatars } from './PresenceAvatars'
import { NotificationBell } from './NotificationBell'
import { useProjectPresence } from '@/hooks/useProjectPresence'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const { Header: AntHeader } = Layout

export function Header() {
  const { projectId } = useParams<{ projectId: string }>()
  const { users, status, reconnect } = useProjectPresence(projectId!)
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => setCollapsed(c => !c)
  // You’d want to lift `collapsed` up via context or props to control the Sidebar.

  return (
    <AntHeader className={styles.header}>
      <ToggleSidebarButton collapsed={collapsed} onToggle={toggle} />
      <BreadcrumbNav />
      <NotificationBell />
      <PresenceAvatars users={users} status={status} onReconnect={reconnect} />
    </AntHeader>
  )
}
