import { useState, type ReactNode } from 'react';
import { Modal, Steps, Button } from 'antd';
import { BlueprintStep } from '@/components/projects/wizard/BlueprintStep';
import { AIStep } from '@/components/projects/wizard/AIStep';
import { EmptyStep } from '@/components/projects/wizard/EmptyStep';

const { Step } = Steps;

export interface CreateProjectWizardProps {
  visible: boolean;
  onClose: () => void;
  onProjectCreated?: (projectId: string, label: string) => void;
  width?: number;
  title?: string;
  'data-testid'?: string;
}

interface WizardStep {
  title: string;
  content: ReactNode;
}

export function CreateProjectWizard({
  visible,
  onClose,
  onProjectCreated,
  title = 'Create New Project',
  width = 600,
  'data-testid': testId,
}: CreateProjectWizardProps) {
  const [current, setCurrent] = useState(0);

  const steps: WizardStep[] = [
    {
      title: 'Blueprint',
      content: <BlueprintStep onNext={() => setCurrent(1)} />,
    },
    {
      title: 'Edit content',
      content: <AIStep onNext={() => setCurrent(2)} onBack={() => setCurrent(0)} />,
    },
    {
      title: 'Validate',
      content: (
        <EmptyStep
          onBack={() => setCurrent(1)}
          onFinish={onClose}
          onProjectCreated={onProjectCreated}
        />
      ),
    },
  ];

  const isLast = current === steps.length - 1;

  return (
    <Modal
      open={visible}
      title={title}
      footer={null}
      onCancel={onClose}
      width={width}
      data-testid={testId}
      aria-label="Create project wizard"
    >
      <Steps current={current} size="small" aria-label="Project creation steps">
        {steps.map(s => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>

      <div style={{ marginTop: 24 }}>
        {steps[current].content}
      </div>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        {!isLast && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>
            Next
          </Button>
        )}
        {isLast && (
          <Button type="primary" onClick={onClose}>
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
}
