const react = require('eslint-plugin-react');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
      },
    },
    plugins: {
      react: react, // plugin object
    },
    rules: {
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      semi: ['error', 'always'],
      'no-console': 'off',
      quotes: ['error', 'double'],
      eqeqeq: ['error', 'always'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
