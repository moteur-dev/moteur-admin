// src/components/projects/details/ActivitySection.tsx
import { Link, useParams } from 'react-router-dom';
import { Skeleton, Alert, Empty, List, Typography } from 'antd';
import type { ActivityEvent } from '@/hooks/useProjectActivity';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import styles from './ActivitySection.module.css';

const { Title, Text } = Typography;

const ACTION_LABELS: Record<string, string> = {
  created: 'created',
  updated: 'updated',
  deleted: 'deleted',
  published: 'published',
  unpublished: 'unpublished',
  commented: 'commented on',
  resolved: 'resolved',
  submitted_for_review: 'submitted for review',
  approved: 'approved',
  rejected: 'rejected',
};

function getResourceLink(
  projectId: string,
  resourceType: string,
  resourceId: string
): { to: string; label: string } | null {
  switch (resourceType) {
    case 'page':
      return { to: `/projects/${projectId}/pages/${resourceId}`, label: resourceId };
    case 'template':
      return { to: `/projects/${projectId}/customization/templates`, label: resourceId };
    case 'entry':
      return { to: `/projects/${projectId}/models`, label: resourceId };
    case 'layout':
      return { to: `/projects/${projectId}/layouts/${resourceId}`, label: resourceId };
    case 'model':
      return { to: `/projects/${projectId}/models/${resourceId}`, label: resourceId };
    default:
      return null;
  }
}

export interface ActivitySectionProps {
  events: ActivityEvent[];
  loading: boolean;
  error?: string;
}

export function ActivitySection({ events, loading, error }: ActivitySectionProps) {
  const { projectId = '' } = useParams<{ projectId: string }>();

  if (loading) {
    return (
      <div className={styles.section}>
        <Title level={4}>Activity</Title>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} active paragraph={false} title={{ width: '80%' }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <Title level={4}>Activity</Title>
        <Alert type="error" message="Failed to load activity" description={error} showIcon />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={styles.section}>
        <Title level={4}>Activity</Title>
        <Empty description="No recent activity" />
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <Title level={4}>Activity</Title>
      <List
        size="small"
        dataSource={events}
        renderItem={(event) => {
          const actionLabel = ACTION_LABELS[event.action] ?? event.action.replace(/_/g, ' ');
          const link = getResourceLink(projectId, event.resourceType, event.resourceId);
          return (
            <List.Item className={styles.item}>
              <Text type="secondary" className={styles.eventText}>
                <strong>{event.userName}</strong> {actionLabel}{' '}
                {link ? (
                  <Link to={link.to}>{link.label}</Link>
                ) : (
                  <span>{event.resourceId}</span>
                )}
                <span className={styles.time}>{formatRelativeTime(event.timestamp)}</span>
              </Text>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
