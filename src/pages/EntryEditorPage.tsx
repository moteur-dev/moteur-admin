import { useParams } from 'react-router-dom';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';

export function EntryEditorPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <MoteurPageLayout title={`Entry Editor for Project ${projectId ?? ''}`}>
      <p>This is where you can edit your entries.</p>
      {/* Add your entry editor components here */}
    </MoteurPageLayout>
  );
}
