import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from 'antd';
import { ModelWizard } from './ModelWizard';
import { MemoryRouter } from 'react-router-dom';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './ModelWizard.Readme.md?raw';

const meta: Meta<typeof ModelWizard> = {
  title: 'Models/ModelWizard',
  component: ModelWizard,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Markdown>{readme}</Markdown>
          <Stories title="Wizard Variants" />
        </>
      ),
    },
  },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};

export default meta;
type Story = StoryObj<typeof ModelWizard>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Wizard</Button>
        {open && <ModelWizard {...args} onClose={() => setOpen(false)} />}
      </>
    );
  },
  args: {
    projectId: 'demo-project',
  },
};

export const WithTitleAndAI: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Custom Wizard</Button>
        {open && <ModelWizard {...args} onClose={() => setOpen(false)} />}
      </>
    );
  },
  args: {
    projectId: 'demo-project',
    title: 'New Model Setup',
    showAI: true,
  },
};

export const NoAI: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open No-AI Wizard</Button>
        {open && <ModelWizard {...args} onClose={() => setOpen(false)} />}
      </>
    );
  },
  args: {
    projectId: 'demo-project',
    showAI: false,
  },
};
