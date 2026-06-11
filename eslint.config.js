import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt([
  // Your custom configs here
  {
    ignores: ['.output', '.nuxt', 'dist', '.nitro', '.data', '.cache'],
  },
  {
    files: ['*.vue', '*/**/*.vue', '*/**/*.ts', '*.ts'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
])
