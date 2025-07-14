
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
import { LoginPage } from '@/pages/LoginPage'
import { AuthProvider } from '@/providers/AuthProvider'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ProjectProvider } from '@/providers/ProjectProvider'
import { ModelProvider } from './providers/ModelProvider'

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
              <div>Blueprints Page</div>
            </ProtectedRoute>
          } />
          <Route path="/projects/:projectId/system/blueprints/:blueprintId" element={
            <ProtectedRoute>
              <div>Blueprint Editor</div>
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/system/users" element={
            <ProtectedRoute>
              <div>User Management Page</div>
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
