import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelCard } from './ModelCard';
import { MemoryRouter } from 'react-router-dom';
import { Title, Subtitle, Description, Primary, Stories, Markdown } from '@storybook/blocks';
import readme from './ModelCard.Readme.md?raw';

const meta: Meta<typeof ModelCard> = {
  title: 'Models/ModelCard',
  component: ModelCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ["autodocs"],
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
type Story = StoryObj<typeof ModelCard>;

const exampleFields = {
  title: { label: 'Title' },
  body: { label: 'Body Text' },
  author: { label: 'Author' },
  tags: { label: 'Tags' },
  published: { label: 'Published' },
  views: { label: 'View Count' },
  category: { label: 'Category' },
};

export const Default: Story = {
  args: {
    projectId: 'demo',
    id: 'article',
    label: 'Article',
    fields: exampleFields,
  },
};

export const WithImage: Story = {
  args: {
    projectId: 'demo',
    id: 'product',
    label: 'Product',
    fields: {
      name: { label: 'Name' },
      price: { label: 'Price' },
      sku: { label: 'SKU' },
      stock: { label: 'Stock' },
    },
    imageUrl: 'https://placehold.co/800x400/EEE/31343C?text=Model%20\nName&font=playfair-display',
    entryCount: 42,
    updatedAt: new Date().toISOString(),
  },
};

export const NoFields: Story = {
  args: {
    projectId: 'demo',
    id: 'empty',
    label: 'Empty Model',
    fields: {},
    entryCount: 0,
  },
};

export const WithManyFields: Story = {
  args: {
    projectId: 'demo',
    id: 'team',
    label: 'Team Member',
    fields: Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [`field${i + 1}`, { label: `Field ${i + 1}` }])
    ),
    entryCount: 5,
  },
};
