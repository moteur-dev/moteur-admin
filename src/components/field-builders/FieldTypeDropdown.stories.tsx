// components/field-builder/FieldTypeDropdown.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldTypeDropdown } from './FieldTypeDropdown';
import { useState } from 'react';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './FieldTypeDropdown.Readme.md?raw';

const meta: Meta<typeof FieldTypeDropdown> = {
  title: 'Fields/Builder/FieldTypeDropdown',
  component: FieldTypeDropdown,
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
type Story = StoryObj<typeof FieldTypeDropdown>;

const Wrapper = (args: any) => {
  const [type, setType] = useState('core/text');

  return (
    <div style={{ padding: 24 }}>
      <FieldTypeDropdown
        {...args}
        value={type}
        onChange={setType}
      />
    </div>
  );
};

export const Default: Story = {
  render: Wrapper,
  args: {},
};

export const CompactMode: Story = {
  render: Wrapper,
  args: {
    compact: true,
  },
};
