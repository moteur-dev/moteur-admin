import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';
import readme from './ProjectCard.Readme.md?raw';
import { FiDatabase} from 'react-icons/fi';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
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
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    id: 'alpha',
    name: 'Marketing Website',
    description: 'Landing pages and brand content for the new campaign.',
    stats: {
      models: 3,
      entries: 12,
      pages: 4,
      layouts: 6
    },
    onSelect: (id: string) => console.log('Selected project', id),
  },
};

export const WithImage: Story = {
  args: {
    id: 'bravo',
    name: 'Product Showcase',
    description: 'Interactive gallery of new products.',
    coverImage: 'https://placehold.co/800x400/EEE/31343C?text=Project%20\nName&font=playfair-display',
    stats: {
      models: 5,
      entries: 48,
    },
    onSelect: id => console.log('Open project', id),
  },
};

export const WithCustomIcon: Story = {
  args: {
    id: 'charlie',
    name: 'Internal Tools',
    description: 'Admin and reporting dashboards.',
    icon: <FiDatabase size={32} />,
    stats: {
      models: 2,
      pages: 1,
    },
    onSelect: id => console.log('Open project', id),
  },
};

export const Minimal: Story = {
  args: {
    id: 'delta',
    name: 'Barebones Project',
    onSelect: id => console.log('Open project', id),
  },
};
