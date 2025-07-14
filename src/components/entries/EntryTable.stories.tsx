import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntryTable } from './EntryTable';
import { Button } from 'antd';
//import readme from './EntryTable.Readme.md?raw';
const readme = '# Foo'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const entries = [
  {
    id: 'a1',
    createdAt: new Date().toISOString(),
    data: {
      title: 'Red Shirt',
      price: 29.99,
      published: true,
    },
  },
  {
    id: 'a2',
    createdAt: new Date().toISOString(),
    data: {
      title: 'Blue Hoodie',
      price: 49.5,
      published: false,
    },
  },
];

const table = {
  columns: [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    {
      key: 'published',
      label: 'Published',
      render: (val: boolean) => (val ? '✅' : '—'),
    },
  ],
  includeId: true,
  includeCreatedAt: true,
  actions: (entry: any) => (
    <Button size="small" onClick={() => console.log('Edit', entry.id)}>
      Edit
    </Button>
  ),
  emptyText: 'No entries found.',
};

const meta: Meta<typeof EntryTable> = {
  title: 'Entries/EntryTable',
  component: EntryTable,
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
type Story = StoryObj<typeof EntryTable>;

export const Default: Story = {
  args: {
    entries,
    table,
  },
};

export const EmptyState: Story = {
  args: {
    entries: [],
    table,
  },
};
