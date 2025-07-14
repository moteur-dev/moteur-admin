// src/components/projects/ProjectDetails.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectOverview } from '@/components/projects/details/ProjectOverview'
import { PagesSection } from '@/components/projects/details/PagesSection'
import { UsersSection } from '@/components/projects/details/UsersSection'
import { EntriesSection } from '@/components/projects/details/EntriesSection'
import { LayoutsSection } from '@/components/projects/details/LayoutsSection'
import { SettingsSection } from '@/components/projects/details/SettingsSection'
import { ContentWrapper } from '@/components/layout/ContentWrapper'
import { useProject } from '@/hooks/useProject'
import { usePages } from '@/hooks/usePages'
import { useEntries } from '@/hooks/useEntries'
import { useLayouts } from '@/hooks/useLayouts'
import { useProjectPresence } from '@/hooks/useProjectPresence'

export function ProjectDetails() {
  const { projectId = '' } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  // Core project data
  const {
    data: project,
    loading: projLoading,
    error: projError,
    //refetch: refetchProject,
  } = useProject(projectId)

  // Pages & templates
  const {
    data: pages = [],
    loading: pagesLoading,
    error: pagesError,
  } = usePages(projectId)

  // Entries
  const {
    data: entries = [],
    loading: entriesLoading,
    error: entriesError,
  } = useEntries(projectId)

  // Layouts
  const {
    data: layouts = [],
    loading: layoutsLoading,
    error: layoutsError,
  } = useLayouts(projectId)

  // Presence for UsersSection
  const {
    users: onlineUsers,
    status: presenceStatus,
    //reconnect,
  } = useProjectPresence(projectId)

  return (
    <ContentWrapper>
      {/* Project overview with Edit/Delete actions */}
      <ProjectOverview
        id={projectId}
        name={project?.label ?? ''}
        description={project?.description}
        createdAt={project?.meta?.audit?.createdAt ?? ''}
        updatedAt={project?.meta?.audit?.updatedAt ?? ''}
        loading={projLoading}
        actions={[
          <button
            key="edit"
            onClick={() => navigate('edit')}
            aria-label="Edit project"
          >
            Edit
          </button>,
          <button
            key="delete"
            onClick={() => {
              /* delete logic */
              navigate('/projects')
            }}
            aria-label="Delete project"
          >
            Delete
          </button>,
        ]}
      />

      {/* Pages & Templates */}
      <PagesSection
        pages={pages ?? []}
        loading={pagesLoading}
        error={pagesError ? 'Failed to load pages' : undefined}
        onSelectPage={(id) => navigate(`pages/${id}`)}
      />

      {/* Users & Presence */}
      <UsersSection
        authorizedUsers={project?.users ?? []}
        onlineUsers={onlineUsers}
        loading={presenceStatus === 'connecting'}
        error={presenceStatus === 'error' ? 'Connection lost' : undefined}
      />

      {/* Entries */}
      <EntriesSection
        entries={entries ?? []}
        loading={entriesLoading}
        error={entriesError  ? 'Failed to load entries' : undefined}
        onSelectEntry={(id) => navigate(`entries/${id}`)}
      />

      {/* Layouts */}
      <LayoutsSection
        layouts={layouts ?? []}
        loading={layoutsLoading}
        error={layoutsError ? 'Failed to load layouts' : undefined}
        onSelectLayout={(id) => navigate(`layouts/${id}`)}
      />

      {/* Settings */}
      <SettingsSection
        settings={<div>Settings go here</div>}
        loading={projLoading}
        error={projError ? 'Failed to load settings' : undefined}
        onSave={(/*newSettings*/) => {
          /* save logic */
          //refetchProject()
        }}
      />
    </ContentWrapper>
  )
}
