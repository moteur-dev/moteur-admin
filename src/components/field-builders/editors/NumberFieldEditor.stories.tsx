// components/field-builder/editors/__stories__/NumberFieldEditor.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberFieldEditor } from './NumberFieldEditor';
import { useState } from 'react';
import { Form } from 'antd';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './NumberFieldEditor.Readme.md?raw';

const meta: Meta<typeof NumberFieldEditor> = {
  title: 'Fields/Editors/NumberFieldEditor',
  component: NumberFieldEditor,
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
type Story = StoryObj<typeof NumberFieldEditor>;

const Wrapper = (args: any) => {
  const [field, setField] = useState({
    type: 'core/number',
    label: 'Price',
    default: 10,
    min: 0,
    max: 1000,
    step: 0.01,
  });

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <Form layout="vertical">
        <NumberFieldEditor {...args} field={field} onChange={setField} />
      </Form>
    </div>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};
