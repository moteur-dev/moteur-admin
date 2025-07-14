import type { Meta, StoryObj } from '@storybook/react-vite';
import { SaveBox } from './SaveBox';
import readme from './SaveBox.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof SaveBox> = {
  title: 'Forms/SaveBox',
  component: SaveBox,
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
          <Stories title="Variants" />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof SaveBox>;

export const Default: Story = {
  args: {
    isDraft: true,
    revision: 1,
    updatedAt: new Date().toISOString(),
  },
};


export const AutoMergeOn: Story = {
  args: {
    isDraft: true,
    revision: 2,
    updatedAt: new Date().toISOString(),
    initialAutoMerge: true
  },
};

export const NoDraftYet: Story = {
  args: {
    isDraft: false,
    revision: undefined,
    updatedAt: undefined,
  },
};

export const LoadingStateOnSave: Story = {
  render: (args) => (
    <SaveBox
      {...args}
      onSave={async () => {
        console.log('Saving...');
        return new Promise((resolve) => setTimeout(resolve, 1500));
      }}
      onCancel={() => console.log('Cancel triggered')}
    />
  ),
  args: {
    isDraft: true,
    revision: 5,
    updatedAt: new Date().toISOString(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the "Save" button to trigger a simulated async save and loading state.',
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    isDraft: true,
    revision: 7,
    updatedAt: new Date().toISOString(),
    initialMessage: 'This is a very long change summary that exceeds the typical length. It is meant to test how the SaveBox handles longer messages and whether it maintains usability and readability in such cases.',
  },
};

export const WithRevisions: Story = {
  args: {
    isDraft: true,
    revision: 5,
    updatedAt: new Date().toISOString(),
    revisions: [
      {
        id: 'rev-4',
        number: 4,
        savedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        message: 'Tweaked meta description',
      },
      {
        id: 'rev-3',
        number: 3,
        savedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        message: 'Updated intro paragraph',
      },
    ],
    onSelectRevision: (id) => console.log('Selected revision:', id),
  },
};  

export const ForceDraftMode: Story = {
  args: {
    isDraft: false,
    forceDraftOnly: true,
    revision: 1,
    updatedAt: new Date().toISOString(),
  },
};

export const CustomLabels: Story = {
  args: {
    isDraft: true,
    revision: 10,
    updatedAt: new Date().toISOString(),
    forceDraftOnly: true,
    labels: {
      createDraft: 'Submit for review',
      updateDraft: 'Update pending review',
      cancel: 'Discard changes',
      changeSummary: 'Editorial Notes',
      noDraft: 'No draft found',
    },
  },
};  