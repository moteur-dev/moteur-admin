import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldBoolean } from './FieldBoolean';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import readme from './FieldBoolean.Readme.md?raw';
console.log(typeof readme); // should be "string"

const meta: Meta<typeof FieldBoolean> = {
  title: 'Fields/Inputs/FieldBoolean',
  component: FieldBoolean,
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
type Story = StoryObj<typeof FieldBoolean>;

export const Default: Story = {
  args: {
    value: true,
  },
};

export const FalseValue: Story = {
  args: {
    value: false,
  },
};

export const ReadOnly: Story = {
  args: {
    value: true,
    readOnly: true,
  },
};

export const ReadOnlyTextMode: Story = {
  args: {
    value: false,
    readOnly: true,
    meta: {
      displayMode: 'text',
      onLabel: '✔ Yes',
      offLabel: '✖ No',
    },
  },
};

export const WithLabel: Story = {
  args: {
    value: true,
    meta: {
      label: 'Published',
    },
  },
};

export const SmallToggle: Story = {
  args: {
    value: true,
    meta: {
      size: 'small',
      label: 'Featured',
    },
  },
};

export const CustomLabels: Story = {
  args: {
    value: false,
    meta: {
      onLabel: 'Visible',
      offLabel: 'Hidden',
      displayMode: 'text',
    },
    readOnly: true,
  },
};
