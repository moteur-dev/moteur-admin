// src/components/projects/details/KeyMetricsRow.tsx
import { Link, useParams } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { FileTextOutlined, UnorderedListOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './KeyMetricsRow.module.css';

const { Text } = Typography;

export interface KeyMetricsRowProps {
  pagesCount: number;
  entriesCount: number;
  pendingReviewCount: number;
  loading?: boolean;
}

export function KeyMetricsRow({
  pagesCount,
  entriesCount,
  pendingReviewCount,
  loading = false,
}: KeyMetricsRowProps) {
  const { projectId = '' } = useParams<{ projectId: string }>();

  if (loading) {
    return (
      <div className={styles.row}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className={styles.card} loading />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <Card size="small" className={styles.card}>
        <div className={styles.metric}>
          <FileTextOutlined className={styles.icon} />
          <div>
            <div className={styles.value}>{pagesCount}</div>
            <Text type="secondary">Pages</Text>
          </div>
        </div>
      </Card>
      <Card size="small" className={styles.card}>
        <div className={styles.metric}>
          <UnorderedListOutlined className={styles.icon} />
          <div>
            <div className={styles.value}>{entriesCount}</div>
            <Text type="secondary">Entries</Text>
          </div>
        </div>
      </Card>
      <Card size="small" className={styles.card}>
        <Link to={`/projects/${projectId}/reviews`} className={styles.metricLink}>
          <div className={styles.metric}>
            <ClockCircleOutlined className={styles.icon} />
            <div>
              <div className={styles.value}>{pendingReviewCount}</div>
              <Text type="secondary">
                Pending review
                {pendingReviewCount > 0 && (
                  <span className={styles.needsAttention}> · needs attention</span>
                )}
              </Text>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
