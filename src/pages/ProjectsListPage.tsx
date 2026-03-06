// src/pages/ProjectsListPage.tsx
import { useState, useMemo } from 'react';
import { Avatar, Row, Col, Skeleton, Empty, Alert, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import type { ProjectSchema } from '@/types/Project';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CreateProjectWizard } from '@/components/projects/CreateProjectWizard';
import styles from './ProjectsListPage.module.css';
import { useAuth } from '@/hooks/useAuth';

const { Title } = Typography;

export function ProjectsListPage() {
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useProjects({
    retries: 2,
    retryDelayMs: 1000,
  })
  const [query] = useState('')
  
  const [wizardVisible, setWizardVisible] = useState(false)
  const { user, logout } = useAuth();

  const filtered = useMemo<ProjectSchema[]>(() => {
    const q = query.trim().toLowerCase()
    const projects: ProjectSchema[] = data ?? []
    return q
      ? projects.filter(p => p.label.toLowerCase().includes(q))
      : projects
  }, [data, query])

  const handleSelect = (id: string) => navigate(`/projects/${id}`)
  const openWizard = () => setWizardVisible(true)
  const closeWizard = () => setWizardVisible(false)

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        {user && (
          <div className={styles.greeting}>
            <div className={styles.welcomeRow}>
              <span className={styles.welcomeText}>
                Welcome, {user.name?.trim() ? user.name : user.email}
              </span>
              {user.avatar && <Avatar src={user.avatar} alt={user.name ?? undefined} size="large" shape="square" />}
            </div>
            <Button type="default" icon={<FiLogOut />} onClick={logout} className={styles.logoutBtn} aria-label="Log out">
              Log out
            </Button>
          </div>
        )}

        <Title level={2} className={styles.title}>
          Select a Project
        </Title>
      {error && <Alert type="error" message="Failed to load projects" description={error} showIcon />}
      {loading && (
        <Row gutter={[16, 16]} justify="center">
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i}>
              <Skeleton active title={false} paragraph={{ rows: 3 }} style={{ width: 240 }} />
            </Col>
          ))}
        </Row>
      )}
      {!loading && (
        <>
          <div className={styles.createProjectRow}>
            <Button type="primary" size="large" onClick={openWizard} icon={<FiPlus />} className={styles.createProjectButton}>
              Create New Project
            </Button>
          </div>
          <Row gutter={[16, 16]} justify="center" className={styles.projectsGrid}>
            {filtered.length === 0 ? (
              <Col xs={24}>
                <Empty description="No projects found" />
              </Col>
            ) : (
              filtered.map(p => (
                <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
                  <ProjectCard
                    id={p.id}
                    name={p.label}
                    description={p.description ?? 'No description provided.'}
                    onSelect={handleSelect}
                  />
                </Col>
              ))
            )}
          </Row>
        </>
      )}
      </div>

      <CreateProjectWizard
        visible={wizardVisible}
        onClose={closeWizard}
        onCreated={refetch}
      />
    </div>
  )
}
