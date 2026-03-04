import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '@/hooks/useProject';
import { useCurrentProject } from '@/hooks/useCurrentProject';

/**
 * Sets project context from route params so the sidebar and breadcrumbs show the current project.
 * Use inside ProjectProvider for project-scoped routes that don't load project themselves.
 */
export function SetProjectFromRoute({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams<{ projectId?: string }>();
  const { setProject } = useCurrentProject();
  const { data: project } = useProject(projectId ?? '');

  useEffect(() => {
    if (project) setProject(project.id, project.label, project);
  }, [project, setProject]);

  return <>{children}</>;
}
