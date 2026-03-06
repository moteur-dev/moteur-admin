// src/components/layout/header/BreadcrumbNav.tsx
import { Breadcrumb, Typography, Dropdown, Menu } from 'antd'
import { Link, useLocation, matchPath } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { useCurrentProject } from '@/hooks/useCurrentProject'
import { FiHome, FiFolder, FiDatabase } from 'react-icons/fi'
import type React from 'react'
import { useModel } from '@/hooks/useModel'

const { Text } = Typography

interface Crumb {
  to: string
  label: string
  children?: { to: string; label: string }[]
  icon?: React.ReactNode
}

export function BreadcrumbNav() {
  const { pathname } = useLocation()
  const { projectId, projectLabel } = useCurrentProject()
  const { data: model } = useModel(projectId ?? '', pathname.split('/').pop() ?? '')

  const crumbs: Crumb[] = [
    { to: '/projects', label: 'Projects', icon: <FiHome /> },
    {
      to: '/projects/:projectId',
      label: projectLabel ?? 'Project',
      icon: <FiFolder />,
    },
    { to: '/projects/:projectId/models', label: 'Models', icon: <FiDatabase /> },
    { to: '/projects/:projectId/models/:modelId', label: model?.label ?? 'Model', icon: <FiDatabase /> },
    { to: '/projects/:projectId/pages', label: 'Pages', icon: <FiFolder /> },
    { to: '/projects/:projectId/pages/:pageId', label: 'Page Editor', icon: <FiFolder /> },
    { to: '/projects/:projectId/models/:modelId/entries', label: 'Entries', icon: <FiFolder /> },
    { to: '/projects/:projectId/models/:modelId/entries/:entryId', label: 'Entry Editor' },
    // Add more route patterns as needed
  ];

  const matched = crumbs
    .map(({ to, label, children }) => {
      const match = matchPath({ path: to, end: false }, pathname);
      if (!match) return null;

      const url = match.pathname;
      return { to: url, label, children };
    })
    .filter(Boolean) as Array<Crumb & { to: string }>;


  return (
    <Breadcrumb style={{ margin: '0 16px', flex: 1 }}>
      {matched.map((crumb, i) => {
        const isLast = i === matched.length - 1

        // If this crumb has children, build a Menu for the dropdown
        let content: React.ReactNode = crumb.label
        if (crumb.children && !isLast) {
          const menu = (
            <Menu items={crumb.children.map(child => ({
              key: child.to,
              label: <Link to={child.to}>{child.label}</Link>,
            }))} />
          )
          content = (
            <Dropdown overlay={menu} trigger={['hover']}>
              <span>
                {crumb.label} <DownOutlined />
              </span>
            </Dropdown>
          )
        }

        return (
          <Breadcrumb.Item key={crumb.to}>
            {isLast
              ? <Text>{crumb.label}</Text>
              : <Link to={crumb.to}>{content}</Link>
            }
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
