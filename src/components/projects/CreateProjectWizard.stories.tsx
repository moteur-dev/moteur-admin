import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateProjectWizard } from './CreateProjectWizard';
import readme from './CreateProjectWizard.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import { useState } from 'react';
import { Button } from 'antd';

const meta: Meta<typeof CreateProjectWizard> = {
  title: 'Projects/CreateProjectWizard',
  component: CreateProjectWizard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Markdown>{readme}</Markdown>
          <Stories title="Examples" />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateProjectWizard>;

const WizardStoryWrapper = (args: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Launch Wizard
      </Button>
      <CreateProjectWizard
        {...args}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: WizardStoryWrapper,
  args: {
    title: 'Create New Project',
    'data-testid': 'wizard-default',
  },
};

export const NarrowWidth: Story = {
  render: WizardStoryWrapper,
  args: {
    title: 'Start from Blueprint',
    width: 400,
    'data-testid': 'wizard-narrow',
  },
};

export const CustomTitle: Story = {
  render: WizardStoryWrapper,
  args: {
    title: '🚀 Start New Journey',
    'data-testid': 'wizard-custom-title',
  },
};
