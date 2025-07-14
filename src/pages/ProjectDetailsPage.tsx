import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Alert, Spin } from 'antd';

import { useProject } from '@/hooks/useProject';
import { useCurrentProject } from '@/hooks/useCurrentProject';

import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { ProjectDetails } from '@/components/projects/ProjectDetails';

export function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { setProject } = useCurrentProject();
  const { data: project, loading, error } = useProject(projectId!);

  useEffect(() => {
    if (project) {
      setProject(project.id, project.label, project);
    }
  }, [project, setProject]);

  return (
    <MoteurPageLayout title={`Project: ${project?.label ?? projectId}`}>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert type="error" message="Failed to load project" description={error} />
      ) : !project ? (
        <Alert type="warning" message="No project data found." />
      ) : (
        <ProjectDetails />
      )}
    </MoteurPageLayout>
  );
}
