import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldTags } from './FieldTags';
import readme from './FieldTags.Readme.md?raw';
import { useState } from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof FieldTags> = {
  title: 'Fields/Inputs/FieldTags',
  component: FieldTags,
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
          <Stories title="Examples" />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldTags>;

const Wrapper = (args: any) => {
  const [tags, setTags] = useState(args.value ?? []);
  return <FieldTags {...args} value={tags} onChange={setTags} />;
};

export const Default: Story = {
  render: Wrapper,
  args: {
    value: ['design', 'marketing', 'ui/ux'],
    placeholder: 'Add tag',
    'data-testid': 'tags-default',
  },
};

export const WithMaxTags: Story = {
  render: Wrapper,
  args: {
    value: ['alpha', 'beta'],
    maxTags: 3,
    placeholder: 'Add up to 3 tags',
    'data-testid': 'tags-max',
  },
};

export const DisallowDuplicates: Story = {
  render: Wrapper,
  args: {
    value: ['repeatable', 'unique'],
    allowDuplicates: false,
    placeholder: 'No repeats allowed',
    'data-testid': 'tags-nodupes',
  },
};

export const ReadOnly: Story = {
  render: Wrapper,
  args: {
    value: ['readonly', 'cannot-edit'],
    readOnly: true,
    'data-testid': 'tags-readonly',
  },
};

export const LongTags: Story = {
  render: Wrapper,
  args: {
    value: [
      'verylongtagthatneedstruncation',
      'normal',
      'anotherextremelylongtagfortooltip',
    ],
    'data-testid': 'tags-long',
  },
};

export const NoEditAllowed: Story = {
  render: Wrapper,
  args: {
    value: ['fixed', 'locked'],
    allowEdit: false,
    placeholder: 'You can only add, not edit',
    'data-testid': 'tags-noedit',
  },
};

export const EmptyInitial: Story = {
  render: Wrapper,
  args: {
    value: [],
    placeholder: 'Start tagging',
    'data-testid': 'tags-empty',
  },
};
