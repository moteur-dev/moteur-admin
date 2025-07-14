import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldNumber } from './FieldNumber';
import readme from './FieldNumber.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof FieldNumber> = {
  title: 'Fields/Inputs/FieldNumber',
  component: FieldNumber,
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
type Story = StoryObj<typeof FieldNumber>;

export const Default: Story = {
  args: {
    value: 42,
    onChange: (val) => console.log('Changed:', val),
  },
};

export const WithMinMaxStep: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    step: 0.5,
    placeholder: 'Enter a number',
    onChange: (val) => console.log('Changed:', val),
  },
};

export const ReadOnly: Story = {
  args: {
    value: 3.14,
    readOnly: true,
    onChange: () => {},
  },
};

export const NullValue: Story = {
  args: {
    value: null,
    placeholder: 'Unset value',
    onChange: (val) => console.log('Changed:', val),
  },
};

export const NegativeValue: Story = {
  args: {
    value: -12,
    onChange: (val) => console.log('Changed:', val),
  },
};

export const WithTestId: Story = {
  args: {
    value: 99,
    onChange: () => {},
    'data-testid': 'field-number-test',
  },
};
