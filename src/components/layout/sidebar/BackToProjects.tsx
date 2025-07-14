// src/components/layout/sidebar/BackToProjects.tsx
import { useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import styles from './BackToProjects.module.css'

export function BackToProjects() {
  const { pathname } = useLocation()

  // Only show on project subroutes
  if (pathname === '/projects' || pathname === '/') {
    return null
  }

  return (
    <div className={styles.backContainer}>
      <Button
        type="link"
        icon={<FiArrowLeft />}
        className={styles.backButton}
        aria-label="Back to projects list"
        href="/projects"
      >
          <FiHome /> Projects
      </Button>
    </div>
  )
}
