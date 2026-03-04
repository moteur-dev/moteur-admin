
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import { LoginPage } from '@/pages/LoginPage'
import { AuthProvider } from '@/providers/AuthProvider'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ProjectProvider } from '@/providers/ProjectProvider'
import { ModelProvider } from './providers/ModelProvider'
import { SetProjectFromRoute } from '@/components/SetProjectFromRoute'

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

          <Route path="/projects/:projectId/system/blueprints" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Blueprints" description="Blueprint management will be available in a future release." />
                </SetProjectFromRoute>
              </ProjectProvider>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/system/blueprints/:blueprintId" element={
            <ProtectedRoute>
              <ProjectProvider>
                <SetProjectFromRoute>
                  <ComingSoonPage title="Blueprint Editor" description="Blueprint editor will be available in a future release." />
                </SetProjectFromRoute>
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

          {/* Redirect to project details if no specific page is found */}
          {/* 404 fallback */}
          <Route path="*" element={
            <PageNotFoundPage />
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
