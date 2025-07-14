// components/field-builder/editors/__stories__/TextFieldEditor.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextFieldEditor } from './TextFieldEditor';
import { useState } from 'react';
import { Form } from 'antd';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './TextFieldEditor.Readme.md?raw';

const meta: Meta<typeof TextFieldEditor> = {
  title: 'Fields/Editors/TextFieldEditor',
  component: TextFieldEditor,
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
type Story = StoryObj<typeof TextFieldEditor>;

const Wrapper = (args: any) => {
  const [field, setField] = useState({
    type: 'core/text',
    label: 'Title',
    description: 'The title of the post',
    default: '',
    multilingual: true,
    placeholder: 'Enter title...',
    maxLength: 100,
    minLength: 5,
    allowEmpty: false,
    autocomplete: true,
    validation: {
      pattern: '^[a-zA-Z0-9\\- ]*$',
      message: 'Only alphanumeric and dashes allowed',
    },
  });

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <Form layout="vertical">
        <TextFieldEditor {...args} field={field} onChange={setField} />
      </Form>
    </div>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};
