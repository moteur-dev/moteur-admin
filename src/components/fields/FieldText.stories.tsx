import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldText } from './FieldText';
import readme from './FieldText.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof FieldText> = {
  title: 'Fields/Inputs/FieldText',
  component: FieldText,
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
type Story = StoryObj<typeof FieldText>;

export const Default: Story = {
  args: {
    value: 'Hello world!',
    /*onChange: (val: string) => console.log('Changed:', val),*/
    'data-testid': 'text-default',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    onChange: (val) => console.log('Changed:', val),
    placeholder: 'Enter something...',
    'data-testid': 'text-placeholder',
  },
};

export const Multiline: Story = {
  args: {
    value: 'Line one\nLine two\nLine three',
    onChange: (val) => console.log('Changed:', val),
    multiline: true,
    rows: 4,
    placeholder: 'Enter multi-line content',
    'data-testid': 'text-multiline',
  },
};

export const MaxLength: Story = {
  args: {
    value: 'Limited',
    onChange: (val) => console.log('Changed:', val),
    maxLength: 10,
    'data-testid': 'text-maxlength',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'Can’t touch this',
    onChange: () => {},
    readOnly: true,
    'data-testid': 'text-readonly',
  },
};

export const Autofocus: Story = {
  args: {
    value: '',
    onChange: () => {},
    autoFocus: true,
    placeholder: 'I have focus!',
    'data-testid': 'text-autofocus',
  },
};

export const WithPrefixSuffix: Story = {
  args: {
    value: 'USD',
    onChange: (val) => console.log(val),
    prefix: '$',
    suffix: 'USD',
    'data-testid': 'text-prefix-suffix',
  },
};

export const Empty: Story = {
  args: {
    value: null,
    onChange: (val) => console.log(val),
    placeholder: 'Empty value',
    'data-testid': 'text-empty',
  },
};

export const LongInput: Story = {
  args: {
    value:
      'This is a very long string input that may overflow or wrap depending on layout rules and style constraints.',
    onChange: (val) => console.log(val),
    'data-testid': 'text-long',
  },
};
