import { Button } from 'antd'
import { FiMenu, FiX } from 'react-icons/fi'

interface ToggleSidebarButtonProps {
  collapsed: boolean
  onToggle: () => void
}

export function ToggleSidebarButton({ collapsed, onToggle }: ToggleSidebarButtonProps) {
  return (
    <Button
      type="text"
      icon={collapsed ? <FiMenu /> : <FiX />}
      onClick={onToggle}
      aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
    />
  )
}