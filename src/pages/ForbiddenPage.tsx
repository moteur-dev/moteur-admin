import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 48, maxWidth: 480, margin: '4rem auto', textAlign: 'center' }}>
      <Title level={2}>Access denied</Title>
      <Paragraph type="secondary">
        You don&apos;t have permission to view this page. Administrator access is required.
      </Paragraph>
      <Button type="primary" onClick={() => navigate('/login')}>
        Sign in with a different account
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={() => navigate('/projects')}>
        Back to projects
      </Button>
    </div>
  );
}
