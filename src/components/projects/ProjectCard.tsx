import type { KeyboardEvent } from 'react';
import { Card, Typography, Space } from 'antd';
import { FiFolder, FiLayers, FiFileText, FiDatabase, FiLayout } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './ProjectCard.module.css';

const { Title, Text } = Typography;

export interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  icon?: React.ReactNode;
  stats?: {
    models?: number;
    entries?: number;
    pages?: number;
    layouts?: number;
  };
  onSelect: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export function ProjectCard({
  id,
  name,
  description,
  coverImage,
  icon,
  stats,
  onSelect,
  className,
  style,
  'data-testid': testId,
}: ProjectCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <Card
      hoverable
      onClick={() => onSelect(id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${name}`}
      className={classNames(styles.card, className)}
      style={style}
      data-testid={testId}
      cover={
        coverImage && (
          <img
            src={coverImage}
            alt=""
            className={styles.coverImage}
            aria-hidden
          />
        )
      }
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          {!coverImage && (icon ?? <FiFolder size={32} aria-hidden />)}
        </div>
        <Title level={4} className={styles.title}>
          {name}
        </Title>
        {description && (
          <Text className={styles.description} type="secondary">
            {description}
          </Text>
        )}
      </div>

      {stats && (
        <Space size="middle" className={styles.stats}>
          {typeof stats.models === 'number' && (
            <Text type="secondary">
              <FiLayers aria-hidden /> {stats.models} models
            </Text>
          )}
          {typeof stats.entries === 'number' && (
            <Text type="secondary">
              <FiDatabase aria-hidden /> {stats.entries} entries
            </Text>
          )}
          {typeof stats.pages === 'number' && (
            <Text type="secondary">
              <FiFileText aria-hidden /> {stats.pages} pages
            </Text>
          )}
          {typeof stats.layouts === 'number' && (
            <Text type="secondary">
              <FiLayout aria-hidden /> {stats.layouts} layouts
            </Text>
          )}
        </Space>
      )}
    </Card>
  );
}
