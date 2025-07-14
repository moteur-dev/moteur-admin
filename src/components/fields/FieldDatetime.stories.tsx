import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldDatetime } from './FieldDatetime';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import readme from './FieldDatetime.Readme.md?raw';

const meta: Meta<typeof FieldDatetime> = {
  title: 'Fields/Inputs/FieldDateTime',
  component: FieldDatetime,
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
type Story = StoryObj<typeof FieldDatetime>;

export const Default: Story = {
  args: {
    value: new Date().toISOString(),
  },
};

export const DateOnly: Story = {
  args: {
    value: new Date().toISOString(),
    meta: {
      mode: 'date',
    },
  },
};

export const TimeOnly: Story = {
  args: {
    value: new Date().toISOString(),
    meta: {
      mode: 'time',
    },
  },
};

export const CustomFormat: Story = {
  args: {
    value: new Date().toISOString(),
    meta: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: 'Pick a time...',
    },
  },
};

export const ReadOnly: Story = {
  args: {
    value: new Date().toISOString(),
    readOnly: true,
  },
};

export const ReadOnlyWithLabel: Story = {
  args: {
    value: new Date().toISOString(),
    readOnly: true,
    meta: {
      label: 'Last Updated',
    },
  },
};

export const ReadOnlyCustomFormat: Story = {
  args: {
    value: new Date().toISOString(),
    readOnly: true,
    meta: {
      displayFormat: 'dddd, MMMM D YYYY, h:mm A',
      locale: 'en',
    },
  },
};

export const EmptyValue: Story = {
  args: {
    value: null,
    readOnly: true,
  },
};
