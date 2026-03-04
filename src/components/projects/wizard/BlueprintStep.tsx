// src/components/projects/wizard/BlueprintStep.tsx

import { List, Card, Typography, Skeleton, Alert } from 'antd';
import { useBlueprints } from '@/hooks/useBlueprints';
import styles from './Wizard.module.css';

const { Title } = Typography;

interface BlueprintStepProps {
  onSelect: (blueprintId: string) => void;
  onNext: () => void;
}

export function BlueprintStep({ onSelect, onNext }: BlueprintStepProps) {
  const { data: blueprints, loading, error } = useBlueprints();

  const handleSelect = (id: string) => {
    onSelect(id);
    onNext();
  };

  if (error) {
    return (
      <>
        <Title level={5}>Pick a Blueprint</Title>
        <Alert type="warning" message="Could not load blueprints" description={error} showIcon />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Title level={5}>Pick a Blueprint</Title>
        <Skeleton active paragraph={{ rows: 4 }} />
      </>
    );
  }

  return (
    <>
      <Title level={5}>Pick a Blueprint</Title>
      <p className={styles.description}>
        Choose a project template to start with. You can customize it later.
        <br />
        <strong>Note:</strong> You can always add or remove pages, models, and layouts later. It is
        recommended to start with a blueprint to save time and start with a usable structure.
      </p>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={blueprints}
        renderItem={(bp) => (
          <List.Item>
            <Card
              hoverable
              title={bp.name}
              onClick={() => handleSelect(bp.id)}
              className={styles.card}
            >
              {bp.description ?? 'No description.'}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
