import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Row, Col, Spin, Alert, Empty } from 'antd';

import { useProject } from '@/hooks/useProject';
import { useModels } from '@/hooks/useModels';
import { useCurrentProject } from '@/hooks/useCurrentProject';

import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { ModelCard } from '@/components/models/ModelCard';
import { CreateModelButton } from '@/components/models/CreateModelButton';

export function ModelsListPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { setProject } = useCurrentProject();
  const { data: project } = useProject(projectId!);
  const { data: models, loading, error } = useModels(projectId!);

  useEffect(() => {
    if (project) {
      setProject(project.id, project.label);
    }
  }, [project, setProject]);

  return (
    <MoteurPageLayout title={`Models for ${project?.label || projectId}`}>
      {loading && <Spin />}
      {error && <Alert message="Failed to load models" description={error} type="error" showIcon />}
      {!loading && models?.length === 0 && <Empty description="No models found" />}

      <Row gutter={[16, 16]}>
        {models?.map((model) => (
          <Col key={model.id} style={{ display: 'flex' }}>
            <ModelCard
              projectId={projectId!}
              id={model.id}
              label={model.label}
              fields={model.fields as Record<string, { label?: string }>}
            />
          </Col>
        ))}
      </Row>

      {/* Optional permission check here */}
      <div style={{ marginTop: 24 }}>
        <CreateModelButton projectId={projectId!} />
      </div>
    </MoteurPageLayout>
  );
}
