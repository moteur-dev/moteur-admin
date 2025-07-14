import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldList } from './FieldList';
import readme from './FieldList.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof FieldList> = {
  title: 'Fields/Inputs/FieldList',
  component: FieldList,
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
type Story = StoryObj<typeof FieldList>;

const stringFieldSchema = { type: 'core/text' };
const numberFieldSchema = { type: 'core/number' };

export const PrimitiveList: Story = {
  args: {
    value: ['First', 'Second'],
    onChange: (v) => console.log('List changed:', v),
    schema: {
      type: 'core/list',
      label: 'Primitve list',
      items: stringFieldSchema,
      options: {},
    },
    itemLabel: 'Tag',
    'data-testid': 'primitive-list',
  },
};

export const NumberListWithConstraints: Story = {
  args: {
    value: [5, 10],
    onChange: (v) => console.log('Changed:', v),
    schema: {
      type: 'core/list',
      label: 'Number constraints list',
      items: numberFieldSchema,
      options: {
        minItems: 1,
        maxItems: 5,
        sortable: true,
        allowEmpty: false,
      },
    },
    itemLabel: 'Number',
    addLabel: 'Add Number',
    'data-testid': 'number-list',
  },
};

export const EmptyEnforced: Story = {
  args: {
    value: [],
    onChange: (v) => console.log('Changed:', v),
    schema: {
      type: 'core/list',
      label: 'Empty list',
      items: numberFieldSchema,
      options: {
        allowEmpty: false,
        minItems: 1,
      },
    },
    'data-testid': 'empty-enforced',
  },
};

export const ReadOnly: Story = {
  args: {
    value: ['Read-only item'],
    onChange: () => {},
    schema: {
      type: 'core/list',
      label: 'Read-only list',
      items: stringFieldSchema,
      options: {},
    },
    readOnly: true,
    'data-testid': 'readonly-list',
  },
};
