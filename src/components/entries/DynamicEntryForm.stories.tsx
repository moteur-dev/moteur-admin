import { useForm } from 'antd/es/form/Form';
import { DynamicEntryForm } from './DynamicEntryForm';
import readme from './DynamicEntryForm.Readme.md?raw';
import { useState } from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DynamicEntryForm> = {
  title: 'Forms/DynamicEntryForm',
  component: DynamicEntryForm,
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
          <Stories title="Schemas" />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynamicEntryForm>;

const WithForm = (args: any) => {
  const [form] = useForm();
  const [data, setData] = useState(args.initialValues ?? {});
  return (
    <DynamicEntryForm
      {...args}
      form={form}
      initialValues={data}
      onValuesChange={(updated) => setData(updated)}
    />
  );
};

const textOnlyFields = {
  title: { type: 'core/text', label: 'Title', required: true },
  subtitle: { type: 'core/text', label: 'Subtitle' },
};

const mixedFields = {
  title: { type: 'core/text', label: 'Title', required: true },
  price: { type: 'core/number', label: 'Price', required: true },
  tags: { type: 'core/tags', label: 'Tags' },
};

export const TextOnly: Story = {
  render: WithForm,
  args: {
    fields: textOnlyFields,
    initialValues: {
      title: 'Getting started',
      subtitle: 'This is a sample entry.',
    },
  },
};

export const MixedFields: Story = {
  render: WithForm,
  args: {
    fields: mixedFields,
    initialValues: {
      title: 'Premium Plan',
      price: 49.99,
      tags: ['monthly', 'popular'],
    },
  },
};

export const ReadOnly: Story = {
  render: WithForm,
  args: {
    fields: mixedFields,
    initialValues: {
      title: 'Archived',
      price: 0,
      tags: ['legacy'],
    },
    readOnly: true,
  },
};

export const EmptyInitial: Story = {
  render: WithForm,
  args: {
    fields: mixedFields,
    initialValues: {},
  },
};
