// src/components/layout/sidebar/Logo.tsx
import { Link } from 'react-router-dom'
import styles from './Logo.module.css'  // Optional CSS module for styling
import { FiFolder } from 'react-icons/fi'  // Importing an icon for the logo
import { useCurrentProject } from '@/hooks/useCurrentProject';


export function Logo() {
  const { projectId, projectLabel } = useCurrentProject();
  return (
    <div className={styles.logoContainer}>
      <Link to="/projects" aria-label="Moteur Admin Home">
        <img
          src="/moteur-logo.svg"
          alt="Moteur"
          className={styles.logo}
        />
      </Link>
      {projectId && (
        <div className={styles.logoText}>
          <Link to={`/projects/${projectId}`}><FiFolder /> {projectLabel ?? projectId} </Link>
        </div>
      )}
    </div>
  )
}
