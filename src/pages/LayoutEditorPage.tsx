import { useParams } from 'react-router-dom';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

export function LayoutEditorPage() {
  const { layoutId } = useParams<{ projectId: string; layoutId: string }>();

  return (
    <ComingSoonPage
      title={`Layout: ${layoutId ?? 'Unknown'}`}
      description="Edit layout structure and blocks. Layouts define how content is composed from blocks and fields."
    />
  );
}
