import type { StorybookConfig } from '@storybook/react-vite';
import rawPlugin from 'vite-plugin-raw';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../src/components/**/*.@(stories|docs).@(tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ]
};

export default config;