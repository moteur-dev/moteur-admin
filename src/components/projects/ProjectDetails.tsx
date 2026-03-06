// src/components/projects/ProjectDetails.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectOverview } from '@/components/projects/details/ProjectOverview'
import { PagesSection } from '@/components/projects/details/PagesSection'
import { UsersSection } from '@/components/projects/details/UsersSection'
import { EntriesSection } from '@/components/projects/details/EntriesSection'
import { LayoutsSection } from '@/components/projects/details/LayoutsSection'
import { SettingsSection } from '@/components/projects/details/SettingsSection'
import { ActivitySection } from '@/components/projects/details/ActivitySection'
import { KeyMetricsRow } from '@/components/projects/details/KeyMetricsRow'
import { ContentWrapper } from '@/components/layout/ContentWrapper'
import { useProject } from '@/hooks/useProject'
import { useProjectUsers } from '@/hooks/useProjectUsers'
import { usePages } from '@/hooks/usePages'
import { useEntriesByModel } from '@/hooks/useEntriesByModel'
import { useLayouts } from '@/hooks/useLayouts'
import { useProjectPresence } from '@/hooks/useProjectPresence'
import { useProjectActivity } from '@/hooks/useProjectActivity'
import { useProjectReviews } from '@/hooks/useProjectReviews'

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

  // Entries (grouped by model)
  const {
    data: entriesByModel = [],
    loading: entriesLoading,
    error: entriesError,
  } = useEntriesByModel(projectId)

  // Layouts
  const {
    data: layouts = [],
    loading: layoutsLoading,
    error: layoutsError,
  } = useLayouts(projectId)

  // Project users (full User objects for UsersSection)
  const { data: projectUsers = [], loading: usersLoading } = useProjectUsers(projectId)

  // Presence for UsersSection
  const {
    users: onlineUsers,
    status: presenceStatus,
    //reconnect,
  } = useProjectPresence(projectId)

  // Activity feed
  const { events: activityEvents, loading: activityLoading, error: activityError } = useProjectActivity(projectId, { limit: 10 })

  // Pending reviews for metrics row
  const { count: pendingReviewCount, loading: reviewsLoading } = useProjectReviews(projectId, { status: 'pending' })

  return (
    <ContentWrapper>
      {/* Key metrics row */}
      <KeyMetricsRow
        pagesCount={pages?.length ?? 0}
        entriesCount={entriesByModel.reduce((sum, g) => sum + g.entries.length, 0)}
        pendingReviewCount={pendingReviewCount}
        loading={reviewsLoading}
      />

      {/* Project overview with Edit/Delete actions */}
      <ProjectOverview
        id={projectId}
        name={project?.label ?? ''}
        description={project?.description}
        createdAt={project?.meta?.audit?.createdAt ?? ''}
        updatedAt={project?.meta?.audit?.updatedAt ?? ''}
        loading={projLoading}
        locale={project?.defaultLocale}
        stats={{
          pages: pages?.length ?? 0,
          entries: entriesByModel.reduce((sum, g) => sum + g.entries.length, 0),
          users: projectUsers?.length ?? 0,
        }}
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
        onAddPage={() => navigate('pages/new')}
      />

      {/* Users & Presence */}
      <UsersSection
        authorizedUsers={projectUsers}
        onlineUsers={onlineUsers}
        loading={usersLoading || presenceStatus === 'connecting'}
        error={presenceStatus === 'error' ? 'Connection lost' : undefined}
        onAddUser={() => navigate('system/users')}
      />

      {/* Entries */}
      <EntriesSection
        groups={entriesByModel}
        loading={entriesLoading}
        error={entriesError ? 'Failed to load entries' : undefined}
        onSelectEntry={(modelId, entryId) =>
          navigate(`models/${modelId}/entries/${entryId}`)
        }
        onAddEntry={() => navigate('models')}
      />

      {/* Activity */}
      <ActivitySection
        events={activityEvents}
        loading={activityLoading}
        error={activityError ?? undefined}
      />

      {/* Layouts */}
      <LayoutsSection
        layouts={layouts ?? []}
        loading={layoutsLoading}
        error={layoutsError ? 'Failed to load layouts' : undefined}
        onSelectLayout={(id) => navigate(`layouts/${id}`)}
        onAddLayout={() => navigate('models')}
      />

      {/* Settings */}
      <SettingsSection
        settings={
          project
            ? Object.fromEntries(
                Object.entries({
                  defaultLocale: project.defaultLocale,
                  supportedLocales: project.supportedLocales,
                  features: project.features,
                  workflow: project.workflow,
                  isActive: project.isActive,
                }).filter(([, v]) => v !== undefined)
              )
            : {}
        }
        loading={projLoading}
        error={projError ? 'Failed to load settings' : undefined}
        onSave={(/*newSettings*/) => {
          /* save logic - would call updateProject */
        }}
      />
    </ContentWrapper>
  )
}
