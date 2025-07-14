import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewProjectCard } from './NewProjectCard';
import readme from './NewProjectCard.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof NewProjectCard> = {
  title: 'Projects/NewProjectCard',
  component: NewProjectCard,
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
type Story = StoryObj<typeof NewProjectCard>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Create new project'),
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Start New Site',
    onClick: () => console.log('Start new site'),
  },
};

export const CustomIcon: Story = {
  args: {
    label: 'Launch Something',
    icon: <span style={{ fontSize: 32 }}>🚀</span>,
    onClick: () => console.log('Launch!'),
  },
};
