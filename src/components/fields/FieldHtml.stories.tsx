import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldHtml } from './FieldHtml';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import readme from './FieldHtml.Readme.md?raw';

const meta: Meta<typeof FieldHtml> = {
  title: 'Fields/Inputs/FieldHtml',
  component: FieldHtml,
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
type Story = StoryObj<typeof FieldHtml>;

const initialHtml = `
  <p>This is <strong>rich text</strong> with <em>formatting</em>.</p>
  <ul><li>Bullet</li><li>Points</li></ul>
`;

export const DefaultEditor: Story = {
  args: {
    value: initialHtml,
  },
};

export const NoToolbar: Story = {
  args: {
    value: initialHtml,
    meta: {
      toolbar: false,
    },
  },
};

export const CompactMode: Story = {
  args: {
    value: initialHtml,
    meta: {
      compact: true,
      height: 120,
    },
  },
};

export const ReadOnlyPreview: Story = {
  args: {
    value: initialHtml,
    readOnly: true,
  },
};

export const PreviewExplicit: Story = {
  args: {
    value: initialHtml,
    meta: {
      displayMode: 'preview',
    },
  },
};

export const EmptyReadOnly: Story = {
  args: {
    value: '',
    readOnly: true,
  },
};

export const WithLabel: Story = {
  args: {
    value: initialHtml,
    readOnly: true,
    meta: {
      label: 'Description',
      displayMode: 'preview',
    },
  },
};
