// src/components/projects/wizard/BlueprintStep.tsx

import { List, Card, Typography, Skeleton, Alert, Button } from 'antd';
import { useBlueprints } from '@/hooks/useBlueprints';
import styles from './Wizard.module.css';

const { Title } = Typography;

/** Empty string = "Empty project" chosen; undefined = not selected yet; string = blueprint id */
export type BlueprintSelection = string | undefined;

interface BlueprintStepProps {
  /** undefined = no selection, '' = empty project, string = blueprint id */
  selectedBlueprintId: BlueprintSelection;
  onSelect: (blueprintId: BlueprintSelection) => void;
  onNext: () => void;
}

export const EMPTY_PROJECT_ID = '';

export function BlueprintStep({ selectedBlueprintId, onSelect, onNext }: BlueprintStepProps) {
  const { data: blueprints, loading, error } = useBlueprints();

  if (error) {
    return (
      <>
        <Title level={5}>Type of project</Title>
        <Alert type="warning" message="Could not load templates" description={error} showIcon />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Title level={5}>Type of project</Title>
        <Skeleton active paragraph={{ rows: 4 }} />
      </>
    );
  }

  const options = [
    { id: EMPTY_PROJECT_ID, name: 'Empty project', description: 'No pages, models, or layouts. Start from scratch.' },
    ...(blueprints ?? []),
  ];
  const hasSelection = selectedBlueprintId !== undefined;

  return (
    <>
      <Title level={5}>Type of project</Title>
      <p className={styles.description}>
        Choose a template to start from. You can customize everything later.
      </p>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={options}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={item.name}
              onClick={() => onSelect(item.id)}
              className={styles.card}
              style={{
                borderColor: selectedBlueprintId === item.id ? 'var(--ant-color-primary)' : undefined,
                borderWidth: selectedBlueprintId === item.id ? 2 : 1,
              }}
            >
              {item.description ?? 'No description.'}
            </Card>
          </List.Item>
        )}
      />
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={onNext} disabled={!hasSelection}>
          Next
        </Button>
      </div>
    </>
  );
}
