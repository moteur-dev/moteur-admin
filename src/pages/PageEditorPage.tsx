import { useParams } from 'react-router-dom';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';

export function PageEditorPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <MoteurPageLayout title={`Page Editor for ${projectId ?? ''}`}>
      <p>This is where the page editor will be displayed.</p>
    </MoteurPageLayout>
  );
}
