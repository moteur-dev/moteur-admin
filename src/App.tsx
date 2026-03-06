
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { ProjectsListPage } from '@/pages/ProjectsListPage'
import { ProjectDetailsPage } from '@/pages/ProjectDetailsPage'
import { PagesListPage } from '@/pages/PagesListPage'
import { PageEditorPage } from '@/pages/PageEditorPage'
import { ModelsListPage } from '@/pages/ModelsListPage'
import { ModelEditorPage } from '@/pages/ModelEditorPage'
import { EntriesListPage } from '@/pages/EntriesListPage'
import { EntryEditorPage } from '@/pages/EntryEditorPage'
import { PageNotFoundPage } from '@/pages/PageNotFoundPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { BlueprintsListPage } from '@/pages/BlueprintsListPage'
import { BlueprintEditorPage } from '@/pages/BlueprintEditorPage'
import { LoginPage } from '@/pages/LoginPage'
import { AuthProvider } from '@/providers/AuthProvider'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ProjectProvider } from '@/providers/ProjectProvider'
import { ModelProvider } from './providers/ModelProvider'
import { SetProjectFromRoute } from '@/components/SetProjectFromRoute'

function RedirectToModels() {
  const { projectId } = useParams<{ projectId: string }>();
  return <Navigate to={`/projects/${projectId}/models`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirect root to /projects */}
          <Route path="/" element={
            <Navigate to="/projects" replace />
            } />

          <Route path="/login" element={
            <LoginPage />
            } />

          <Route path="/forbidden" element={
            <ForbiddenPage />
            } />

          <Route path="/projects" element={
            <ProtectedRoute>
                <ProjectsListPage />
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <ProjectDetailsPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/pages" element={
            <ProtectedRoute>
              <ProjectProvider>
                <PagesListPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/pages/:pageId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <PageEditorPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/models" element={
            <ProtectedRoute>
              <ProjectProvider>
                <ModelsListPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/models/:modelId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <ModelProvider>
                  <ModelEditorPage />
                </ModelProvider>
              </ProjectProvider>
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/models/:modelId/entries" element={
            <ProtectedRoute>
              <ProjectProvider>
                <ModelProvider>
                  <EntriesListPage />
                </ModelProvider>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/models/:modelId/entries/:entryId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <ModelProvider>
                  <EntryEditorPage />
                </ModelProvider>
              </ProjectProvider>
            </ProtectedRoute>
          } />

          <Route path="/blueprints" element={
            <ProtectedRoute>
              <ProjectProvider>
                <BlueprintsListPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/blueprints/new" element={
            <ProtectedRoute>
              <ProjectProvider>
                <BlueprintEditorPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/blueprints/:blueprintId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <BlueprintEditorPage />
              </ProjectProvider>
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/system/users" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="User Management" description="User management for this project will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />

          {/* Customization (sidebar: Customization > …) */}
          <Route path="/projects/:projectId/customization" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Customization" description="Configure custom fields, blocks, models, and templates for this project." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/customization/fields" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Custom Fields" description="Custom fields are not yet available in the studio." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/customization/blocks" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Blocks Library" description="Blocks library management will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/customization/models" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <RedirectToModels />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/customization/templates" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Templates" description="Create and edit templates for this project. Define models and entries first, then create templates and pages." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />

          {/* Configuration (sidebar: Configuration > …) */}
          <Route path="/projects/:projectId/configuration" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Configuration" description="Project configuration will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/configuration/billing" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Billing & Plan" description="Billing and plan management will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/configuration/permissions" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Users & Permissions" description="Users and permissions will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/configuration/features" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Features list" description="Feature flags will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/configuration/plugins" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Plugins" description="Plugin management will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />

          {/* Redirect to project details if no specific page is found */}
          {/* 404 fallback */}
          <Route path="*" element={
            <ProjectProvider>
              <PageNotFoundPage />
            </ProjectProvider>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
