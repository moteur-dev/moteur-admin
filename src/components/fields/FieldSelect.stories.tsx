import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldSelect } from './FieldSelect';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import readme from './FieldSelect.Readme.md?raw';

const meta: Meta<typeof FieldSelect> = {
  title: 'Fields/Inputs/FieldSelect',
  component: FieldSelect,
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
type Story = StoryObj<typeof FieldSelect>;

const commonOptions = [
  'draft',
  'published',
  { value: 'archived', label: 'Archived (old)', color: 'red' },
];

export const DefaultSelect: Story = {
  args: {
    value: 'draft',
    meta: {
      options: ['1', '2', '3'],
    },
  },
};

export const WithClearable: Story = {
  args: {
    value: 'published',
    meta: {
      options: commonOptions,
      allowClear: true,
    },
  },
};

export const MultiSelect: Story = {
  args: {
    value: ['draft', 'published'],
    meta: {
      multiple: true,
      options: commonOptions,
    },
  },
};

export const TagsMode: Story = {
  args: {
    value: ['draft', 'archived'],
    meta: {
      mode: 'tags',
      options: commonOptions,
    },
  },
};

export const InlinePreview: Story = {
  args: {
    value: ['archived', 'published'],
    readOnly: true,
    meta: {
      mode: 'inline',
      options: commonOptions,
      label: 'Status',
    },
  },
};

export const ReadOnlySingle: Story = {
  args: {
    value: 'draft',
    readOnly: true,
    meta: {
      options: commonOptions,
    },
  },
};

export const ReadOnlyMultiple: Story = {
  args: {
    value: ['draft', 'archived'],
    readOnly: true,
    meta: {
      options: commonOptions,
    },
  },
};

export const EmptyReadOnly: Story = {
  args: {
    value: '',
    readOnly: true,
    meta: {
      options: commonOptions,
      label: 'Status',
    },
  },
};
