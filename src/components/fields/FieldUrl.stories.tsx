import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldUrl } from './FieldUrl';
import readme from './FieldUrl.Readme.md?raw';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Markdown,
} from '@storybook/blocks';

const meta: Meta<typeof FieldUrl> = {
  title: 'Fields/Inputs/FieldUrl',
  component: FieldUrl,
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
type Story = StoryObj<typeof FieldUrl>;

const baseArgs = {
  name: 'url',
  schema: { type: 'core/url', label: 'Website URL' },
};

export const Default: Story = {
  args: {
    ...baseArgs,
    value: 'https://moteur.dev',
    'data-testid': 'url-default',
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    value: '',
    placeholder: 'https://example.com',
    'data-testid': 'url-empty',
  },
};

export const InsecureHttp: Story = {
  args: {
    ...baseArgs,
    value: 'http://oldsite.net',
    'data-testid': 'url-insecure',
  },
};

export const NoProtocol: Story = {
  args: {
    ...baseArgs,
    value: 'example.org',
    'data-testid': 'url-noprotocol',
  },
};

export const ReadOnly: Story = {
  args: {
    ...baseArgs,
    value: 'https://readonly.com',
    readOnly: true,
    'data-testid': 'url-readonly',
  },
};

export const WithCustomSuffix: Story = {
  args: {
    ...baseArgs,
    value: 'https://docs.example.com',
    suffix: <span style={{ fontStyle: 'italic', opacity: 0.6 }}>🔗</span>,
    'data-testid': 'url-custom-suffix',
  },
};
