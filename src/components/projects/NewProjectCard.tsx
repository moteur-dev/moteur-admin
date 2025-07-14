import type { KeyboardEvent } from 'react';
import { Card, Typography } from 'antd';
import { FiPlus } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './NewProjectCard.module.css';

const { Title } = Typography;

export interface NewProjectCardProps {
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export function NewProjectCard({
  onClick,
  label = 'New Project',
  icon,
  className,
  style,
  'data-testid': testId,
}: NewProjectCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      hoverable
      className={classNames(styles.card, className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Create a new project"
      style={style}
      data-testid={testId}
    >
      <div className={styles.iconWrapper}>
        {icon ?? <FiPlus size={32} />}
      </div>
      <Title level={4} className={styles.label}>
        {label}
      </Title>
    </Card>
  );
}
