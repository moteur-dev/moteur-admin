import { Link } from 'react-router-dom';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';

export function PageNotFoundPage() {
  return (
    <MoteurPageLayout title="Page not found">
      <p>
        Try going back or <Link to="/">navigate to our main menu</Link>.
      </p>
    </MoteurPageLayout>
  );
}
