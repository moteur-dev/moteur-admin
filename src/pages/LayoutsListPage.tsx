import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spin, Alert, Empty, List, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useProject } from '@/hooks/useProject';
import { useLayouts } from '@/hooks/useLayouts';
import { useCurrentProject } from '@/hooks/useCurrentProject';

import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';

export function LayoutsListPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { setProject } = useCurrentProject();
  const { data: project } = useProject(projectId!);
  const { data: layouts, loading, error } = useLayouts(projectId ?? '');

  useEffect(() => {
    if (project) {
      setProject(project.id, project.label);
    }
  }, [project, setProject]);

  return (
    <MoteurPageLayout title={`Layouts for ${project?.label || projectId}`}>
      {loading && <Spin />}
      {error && <Alert message="Failed to load layouts" description={error} type="error" showIcon />}
      {!loading && layouts?.length === 0 && (
        <Empty description="No layouts yet">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/projects/${projectId}/models`)}>
            Add layout
          </Button>
        </Empty>
      )}
      {!loading && layouts && layouts.length > 0 && (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/projects/${projectId}/models`)}>
              Add layout
            </Button>
          </div>
          <List
            bordered
            dataSource={layouts}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/projects/${projectId}/layouts/${item.id}`)}
              >
                <Typography.Text strong>{item.name}</Typography.Text>
              </List.Item>
            )}
          />
        </>
      )}
    </MoteurPageLayout>
  );
}
