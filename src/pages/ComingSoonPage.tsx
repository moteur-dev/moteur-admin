import { Typography } from 'antd';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';

const { Paragraph } = Typography;

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export function ComingSoonPage({ title, description = 'This section is not yet available.' }: ComingSoonPageProps) {
  return (
    <MoteurPageLayout title={title}>
      <Paragraph type="secondary">{description}</Paragraph>
    </MoteurPageLayout>
  );
}
