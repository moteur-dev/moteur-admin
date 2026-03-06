// src/components/projects/wizard/RecapStep.tsx

import { Button, Typography, Descriptions, Spin } from 'antd';
import type { DetailsStepValues } from './DetailsStep';
import { useBlueprint } from '@/hooks/useBlueprints';
import { EMPTY_PROJECT_ID } from './BlueprintStep';

const { Title, Text } = Typography;

interface RecapStepProps {
  details: DetailsStepValues;
  selectedBlueprintId: string | undefined;
  onBack: () => void;
  onCreate: () => void;
  loading?: boolean;
}

export function RecapStep({
  details,
  selectedBlueprintId,
  onBack,
  onCreate,
  loading = false,
}: RecapStepProps) {
  const isEmptyProject = selectedBlueprintId === undefined || selectedBlueprintId === EMPTY_PROJECT_ID;
  const blueprintIdToFetch = !isEmptyProject ? selectedBlueprintId : null;
  const { data: blueprint, loading: blueprintLoading } = useBlueprint(blueprintIdToFetch ?? null);

  const template = blueprint?.template;
  const hasTemplateContent =
    template &&
    ((template.models?.length ?? 0) > 0 ||
      (template.layouts?.length ?? 0) > 0 ||
      (template.structures?.length ?? 0) > 0);

  return (
    <>
      <Title level={5}>Review</Title>
      <p style={{ marginBottom: 16, color: 'rgba(0,0,0,0.65)' }}>
        Summary of what will be created. Click Create to finish.
      </p>

      <Descriptions column={1} size="small" bordered style={{ marginBottom: 24 }}>
        <Descriptions.Item label="Project name">{details.label || '—'}</Descriptions.Item>
        <Descriptions.Item label="Project ID">{details.id || '—'}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {details.description?.trim() || 'No description'}
        </Descriptions.Item>
        <Descriptions.Item label="Template">
          {isEmptyProject ? (
            <Text type="secondary">Empty project – no template</Text>
          ) : blueprintLoading ? (
            <Spin size="small" />
          ) : blueprint ? (
            <>
              <Text strong>{blueprint.name}</Text>
              {hasTemplateContent ? (
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                  {(template!.models?.length ?? 0) > 0 && (
                    <li>
                      {(template!.models?.length ?? 0)} model(s)
                    </li>
                  )}
                  {(template!.layouts?.length ?? 0) > 0 && (
                    <li>
                      {(template!.layouts?.length ?? 0)} layout(s)
                    </li>
                  )}
                  {(template!.structures?.length ?? 0) > 0 && (
                    <li>
                      {(template!.structures?.length ?? 0)} structure(s)
                    </li>
                  )}
                </ul>
              ) : (
                <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                  No pre-defined content
                </Text>
              )}
            </>
          ) : (
            <Text type="secondary">{blueprint?.name ?? 'Unknown template'}</Text>
          )}
        </Descriptions.Item>
      </Descriptions>

      <div>
        <Button onClick={onBack} style={{ marginRight: 8 }}>
          Back
        </Button>
        <Button type="primary" onClick={onCreate} loading={loading}>
          Create project
        </Button>
      </div>
    </>
  );
}
