// src/pages/ProjectsListPage.tsx
import { useState, useMemo } from 'react'
import { Avatar, Row, Col, Skeleton, Empty, Alert, Input, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ProjectSchema } from '@/types/Project'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { NewProjectCard } from '@/components/projects/NewProjectCard'
import { CreateProjectWizard } from '@/components/projects/CreateProjectWizard'
import styles from './ProjectsListPage.module.css'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { Button, Select, Image} from 'antd'
import { api } from '@/utils/apiClient'

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

const sizes = [
  { label: 'Square (1024x1024)', value: '1024x1024' },
  { label: 'Wide (1792x1024)', value: '1792x1024' },
  { label: 'Tall (1024x1792)', value: '1024x1792' },
]

export function GenerateImageWidget() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('1024x1024')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setImage(null)

    try {
      const res = await api.post('/ai/generate-image', {
        prompt,
        size,
      })

      const image = res.data?.image
      if (!image || typeof image !== 'string') {
        throw new Error('No image returned')
      }

      setImage(image)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Image generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Title level={3}>🧠 Test Image Generation</Title>
      <TextArea
        placeholder="Describe your image prompt..."
        rows={4}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <Select value={size} onChange={setSize} style={{ width: '100%' }}>
        {sizes.map(s => (
          <Option key={s.value} value={s.value}>
            {s.label}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        loading={loading}
        disabled={!prompt}
        onClick={handleGenerate}
      >
        Generate Image
      </Button>

      {image && (
        <Image src={image} alt="Generated preview" width="100%" />
      )}

      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </Space>
  )
}


export function ProjectsListPage() {
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useProjects({
    retries: 2,
    retryDelayMs: 1000,
  })
  const [query] = useState('')
  
  const [wizardVisible, setWizardVisible] = useState(false)
  const { user } = useCurrentUser();

  const filtered = useMemo<ProjectSchema[]>(() => {
    const q = query.trim().toLowerCase()
    const projects: ProjectSchema[] = data ?? []
    return q
      ? projects.filter(p => p.label.toLowerCase().includes(q))
      : projects
  }, [data, query])

  const handleSelect = (id: string) => navigate(`/projects/${id}`)
  const openWizard = () => setWizardVisible(true)
  const closeWizard = () => {
    setWizardVisible(false)
    refetch()
  }
  const handleProjectCreated = (projectId: string) => {
    setWizardVisible(false)
    refetch()
    navigate(`/projects/${projectId}`)
  }

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        {user && (
          <div className={styles.greeting}>
            <span>Welcome, {user.name || user.email}</span>
            {user.avatar && <Avatar src={user.avatar} alt={user.name} size={'large'} shape='square' />}
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
        <Row gutter={[16, 16]} justify="center">
          <Col key="create">
            <NewProjectCard
              label="Create New Project"
              onClick={openWizard}
            />
          </Col>
          {filtered.map(p => (
            <Col key={p.id} xs={24} sm={12} md={8} lg={6} >
              <ProjectCard
                id={p.id}
                name={p.label}
                description={p.description ?? 'No description provided.'}
                onSelect={handleSelect}
              />
            </Col>
          ))}
        </Row>
      )}
      {!loading && filtered.length === 0 && (
        <Empty description="No projects yet. Create one using the card above." style={{ marginTop: 16 }} />
      )}
      </div>

      <CreateProjectWizard
        visible={wizardVisible}
        onClose={closeWizard}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  )
}
