// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// .eslintrc.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({ ignores: ['dist'] }, {
  extends: [
    js.configs.recommended,
    /*'plugin:react/recommended',*/
    ...tseslint.configs.recommended,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      jsx: 'react-jsx',
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    // React 17+ JSX transform — no need to import React in scope
    'react/react-in-jsx-scope': 'off',
    // Ignore unused-vars errors for the React import
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^React$', args: 'none' }
    ],

    // React Hooks rules
    ...reactHooks.configs.recommended.rules,

    // React Refresh (Fast Refresh) rule
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],

    // Disable some rules that are not applicable or too strict
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}, storybook.configs["flat/recommended"]);
