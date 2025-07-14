import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldColor } from './FieldColor';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';
import readme from './FieldColor.Readme.md?raw';

const meta: Meta<typeof FieldColor> = {
  title: 'Fields/Inputs/FieldColor',
  component: FieldColor,
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
type Story = StoryObj<typeof FieldColor>;

export const Default: Story = {
  args: {
    value: '#ff0000',
  },
};

export const ReadOnlyPicker: Story = {
  args: {
    value: '#00cc99',
    readOnly: true,
    meta: { displayMode: 'picker' },
  },
};

export const ReadOnlySwatch: Story = {
  args: {
    value: '#3366ff',
    readOnly: true,
    meta: {
      displayMode: 'swatch',
      label: 'Brand Color',
    },
  },
};

export const SmallSwatch: Story = {
  args: {
    value: '#f0c',
    readOnly: true,
    meta: {
      displayMode: 'swatch',
      label: 'Accent',
      size: 'small',
    },
  },
};

export const WithLabelAndText: Story = {
  args: {
    value: '#ff8800',
    meta: {
      label: 'Button Background',
      showText: true,
    },
  },
};

export const RGBOutput: Story = {
  args: {
    value: '#44aaee',
    meta: {
      format: 'rgb',
    },
  },
};

export const HSLFormat: Story = {
  args: {
    value: '#44aaee',
    meta: {
      format: 'hsl',
    },
  },
};

export const CompactPicker: Story = {
  args: {
    value: '#8833cc',
    meta: {
      compact: true,
      showText: false,
    },
  },
};
