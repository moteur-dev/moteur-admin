// components/field-builder/__stories__/FieldBuilder.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldBuilder } from './FieldBuilder';
import { useState } from 'react';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './FieldBuilder.Readme.md?raw';

const meta: Meta<typeof FieldBuilder> = {
  title: 'Fields/Builder/FieldBuilder',
  component: FieldBuilder,
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
type Story = StoryObj<typeof FieldBuilder>;

const Template = (initialFields: Record<string, any>) => (args: any) => {
  const [fields, setFields] = useState<Record<string, any>>(initialFields);

  return (
    <div style={{ padding: 24 }}>
      <FieldBuilder {...args} fields={fields} onChange={setFields} />
    </div>
  );
};

export const Default: Story = {
  render: Template({
    title: { type: 'core/text', label: 'Title' },
    price: { type: 'core/number', label: 'Price', min: 0 },
  }),
};

export const ReadOnly: Story = {
  render: Template({
    title: { type: 'core/text', label: 'Title' },
    slug: { type: 'core/text', label: 'Slug' },
  }),
  args: {
    readOnly: true,
  },
};

export const EmptySchema: Story = {
  render: Template({}),
};

export const JSONMode: Story = {
  render: (args) => {
    const [fields, setFields] = useState<Record<string, any>>({
      description: { type: 'core/html', label: 'Description' },
    });

    return (
      <div style={{ padding: 24 }}>
        <FieldBuilder {...args} fields={fields} onChange={setFields} />
      </div>
    );
  },
  name: 'Starts in JSON mode',
};

export const ComplexSchema: Story = {
  render: Template({
    title: { type: 'core/text', label: 'Title' },
    body: { type: 'core/html', label: 'Body' },
    tags: { type: 'core/select', label: 'Tags', options: ['news', 'events'] },
    image: { type: 'core/image', label: 'Hero Image' },
    author: { type: 'core/structure', label: 'Author', schema: 'teamMember' },
    seo: { type: 'core/structure', label: 'SEO Meta', schema: 'seoMeta' },
  }),
};
