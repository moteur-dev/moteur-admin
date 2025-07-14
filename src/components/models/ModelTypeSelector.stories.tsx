
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'antd';
import { ModelTypeSelector } from './ModelTypeSelector';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './ModelTypeSelector.Readme.md?raw';

const meta: Meta<typeof ModelTypeSelector> = {
  title: 'Models/ModelTypeSelector',
  component: ModelTypeSelector,
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
type Story = StoryObj<typeof ModelTypeSelector>;

const Wrapper = (args: any) => {
  return (
    <Form layout="vertical" initialValues={{ type: 'content' }}>
      <Form.Item name="type" label="Model Type">
        <ModelTypeSelector {...args} />
      </Form.Item>
    </Form>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};
