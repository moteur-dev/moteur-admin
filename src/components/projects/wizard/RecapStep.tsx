// src/components/projects/wizard/RecapStep.tsx

import { Button, Typography, Descriptions, Spin } from 'antd';
import type { DetailsStepValues } from './DetailsStep';
import type { SettingsStepValues } from './SettingsStep';
import { useBlueprint } from '@/hooks/useBlueprints';
import { EMPTY_PROJECT_ID } from './BlueprintStep';
import type { User } from '@/types/User';

const { Title, Text } = Typography;

interface RecapStepProps {
  details: DetailsStepValues;
  selectedBlueprintId: string | undefined;
  settings: Partial<SettingsStepValues>;
  currentUser?: User | null;
  onBack: () => void;
  onCreate: () => void;
  loading?: boolean;
}

export function RecapStep({
  details,
  selectedBlueprintId,
  settings,
  currentUser,
  onBack,
  onCreate,
  loading = false,
}: RecapStepProps) {
  const isEmptyProject = selectedBlueprintId === undefined || selectedBlueprintId === EMPTY_PROJECT_ID;
  const blueprintIdToFetch = !isEmptyProject ? selectedBlueprintId : null;
  const { data: blueprint, loading: blueprintLoading } = useBlueprint(blueprintIdToFetch ?? null);

  const template = blueprint?.template;
  const models = (template?.models ?? []) as { id?: string; label?: string }[];
  const layouts = (template?.layouts ?? []) as { id?: string; name?: string }[];
  const structures = (template?.structures ?? []) as unknown[];
  const numModels = models.length;
  const numLayouts = layouts.length;
  const numStructures = structures.length;
  const hasTemplateContent = numModels > 0 || numLayouts > 0 || numStructures > 0;

  const workflowEnabled = settings.workflowEnabled ?? false;
  const requireReview = settings.workflowRequireReview ?? false;
  const ownerLabel = currentUser
    ? (currentUser.name?.trim() ? currentUser.name : currentUser.email)
    : null;

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
        <Descriptions.Item label="Owner">
          {ownerLabel ? (
            <Text>{ownerLabel}</Text>
          ) : (
            <Text type="secondary">Current user (you)</Text>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Workflow">
          {workflowEnabled ? (
            <>
              <Text strong>Review workflow enabled</Text>
              <br />
              <Text type="secondary">
                {requireReview
                  ? 'Authors must submit for review before publish.'
                  : 'Optional review; authors can publish directly.'}
              </Text>
            </>
          ) : (
            <Text type="secondary">No review workflow</Text>
          )}
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
                  {numModels > 0 && (
                    <li>
                      {numModels} model(s)
                      {models.some((m) => m.label) && (
                        <span style={{ marginLeft: 4 }}>
                          ({models.map((m) => m.label || m.id).filter(Boolean).join(', ')})
                        </span>
                      )}
                    </li>
                  )}
                  {numLayouts > 0 && (
                    <li>
                      {numLayouts} layout(s)
                      {layouts.some((l) => l.name || l.id) && (
                        <span style={{ marginLeft: 4 }}>
                          ({layouts.map((l) => l.name || l.id).filter(Boolean).join(', ')})
                        </span>
                      )}
                    </li>
                  )}
                  {numStructures > 0 && (
                    <li>{numStructures} structure(s)</li>
                  )}
                </ul>
              ) : (
                <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                  No pre-defined content
                </Text>
              )}
            </>
          ) : (
            <Text type="secondary">Unknown template</Text>
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
