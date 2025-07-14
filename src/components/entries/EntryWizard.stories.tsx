import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntryWizard } from './EntryWizard';
import { useState } from 'react';
import { Button } from 'antd';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './EntryWizard.Readme.md?raw';

const meta: Meta<typeof EntryWizard> = {
  title: 'Entries/EntryWizard',
  component: EntryWizard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Markdown>{readme}</Markdown>
          <Stories title="Variants" />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof EntryWizard>;

const model = {
  id: 'post',
  label: 'Post',
  fields: {
    title: { type: 'core/text', label: 'Title', required: true },
    description: { type: 'core/text', label: 'Description' },
    tags: { type: 'core/tags', label: 'Tags' },
  },
};

const Wrapper = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Launch Wizard
      </Button>
      {open && (
        <EntryWizard
          {...args}
          model={model}
          modelId="post"
          projectId="demo-project"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};

export const WithCustomTitle: Story = {
  render: Wrapper,
  args: {
    title: 'New Blog Entry',
  },
};

export const WithCustomID: Story = {
  render: Wrapper,
  args: {
    initialId: 'entry-blog-123',
  },
};

export const AIButtonHidden: Story = {
  render: Wrapper,
  args: {
    showAI: false,
  },
};
