// components/field-builder/editors/__stories__/BooleanFieldEditor.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { BooleanFieldEditor } from './BooleanFieldEditor';
import { useState } from 'react';
import { Form } from 'antd';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './BooleanFieldEditor.Readme.md?raw';

const meta: Meta<typeof BooleanFieldEditor> = {
  title: 'Fields/Editors/BooleanFieldEditor',
  component: BooleanFieldEditor,
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
type Story = StoryObj<typeof BooleanFieldEditor>;

const Wrapper = (args: any) => {
  const [field, setField] = useState({
    type: 'core/boolean',
    label: 'Published',
    default: true,
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  return (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Form layout="vertical">
        <BooleanFieldEditor {...args} field={field} onChange={setField} />
      </Form>
    </div>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};
