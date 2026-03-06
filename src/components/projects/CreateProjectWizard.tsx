import { useState, type ReactNode } from 'react';
import { Modal, Steps, message } from 'antd';
import { BlueprintStep } from '@/components/projects/wizard/BlueprintStep';
import { DetailsStep, type DetailsStepValues } from '@/components/projects/wizard/DetailsStep';
import { SettingsStep, type SettingsStepValues } from '@/components/projects/wizard/SettingsStep';
import { RecapStep } from '@/components/projects/wizard/RecapStep';
import { api } from '@/utils/apiClient';
import { useAuth } from '@/hooks/useAuth';

const { Step } = Steps;

export interface CreateProjectWizardProps {
  visible: boolean;
  onClose: () => void;
  onCreated?: () => void;
  width?: number;
  title?: string;
  'data-testid'?: string;
}

const DEFAULT_SETTINGS: Partial<SettingsStepValues> = {
  defaultLocale: 'en',
  supportedLocales: [],
  workflowEnabled: false,
  workflowRequireReview: false,
};

interface WizardStep {
  title: string;
  content: ReactNode;
}

export function CreateProjectWizard({
  visible,
  onClose,
  onCreated,
  title = 'Create New Project',
  width = 600,
  'data-testid': testId,
}: CreateProjectWizardProps) {
  const [current, setCurrent] = useState(0);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | undefined>(undefined);
  const [details, setDetails] = useState<DetailsStepValues | null>(null);
  const [settings, setSettings] = useState<Partial<SettingsStepValues>>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth();

  const handleCreate = async () => {
    if (!details) return;
    const s = settings as SettingsStepValues;
    setLoading(true);
    try {
      const body = {
        id: details.id.trim(),
        label: details.label.trim(),
        description: details.description?.trim() || undefined,
        defaultLocale: (s.defaultLocale ?? 'en').toString().trim() || 'en',
        supportedLocales:
          (s.supportedLocales?.filter(Boolean).length ?? 0) > 0
            ? s.supportedLocales!.filter(Boolean)
            : undefined,
        workflow: s.workflowEnabled
          ? {
              enabled: true,
              mode: 'auto_publish' as const,
              requireReview: s.workflowRequireReview ?? false,
            }
          : undefined,
        ...(selectedBlueprintId && selectedBlueprintId !== '' && { blueprintId: selectedBlueprintId }),
      };
      await api.post('/projects', body);
      message.success('Project created. You have been added as a member.');
      onClose();
      onCreated?.();
    } catch (err: any) {
      message.error(err.response?.data?.error ?? err.message ?? 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const steps: WizardStep[] = [
    {
      title: 'Type',
      content: (
        <BlueprintStep
          selectedBlueprintId={selectedBlueprintId}
          onSelect={setSelectedBlueprintId}
          onNext={() => setCurrent(1)}
        />
      ),
    },
    {
      title: 'Basic info',
      content: (
        <DetailsStep
          values={details ?? {}}
          onChange={(v) => setDetails(v)}
          onNext={() => setCurrent(2)}
          onBack={() => setCurrent(0)}
        />
      ),
    },
    {
      title: 'Settings',
      content: details ? (
        <SettingsStep
          details={details}
          settings={settings}
          onChange={(v) => setSettings(v)}
          onBack={() => setCurrent(1)}
          onNext={() => setCurrent(3)}
        />
      ) : null,
    },
    {
      title: 'Recap',
      content: details ? (
        <RecapStep
          details={details}
          selectedBlueprintId={selectedBlueprintId}
          settings={settings as SettingsStepValues}
          currentUser={currentUser ?? undefined}
          onBack={() => setCurrent(2)}
          onCreate={handleCreate}
          loading={loading}
        />
      ) : null,
    },
  ];

  return (
    <Modal
      open={visible}
      title={title}
      footer={null}
      onCancel={onClose}
      width={width}
      data-testid={testId}
      aria-label="Create project wizard"
      destroyOnClose
      afterClose={() => {
        setCurrent(0);
        setSelectedBlueprintId(undefined);
        setDetails(null);
        setSettings(DEFAULT_SETTINGS);
      }}
    >
      <Steps current={current} size="small" aria-label="Project creation steps">
        {steps.map((s) => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>

      <div style={{ marginTop: 24 }}>{steps[current].content}</div>
    </Modal>
  );
}
