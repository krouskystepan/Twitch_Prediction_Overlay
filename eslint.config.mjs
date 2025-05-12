import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const baseConfig = compat.extends(
  'next/core-web-vitals',
  'next/typescript'
  // 'plugin:tailwindcss/recommended'
)

const customRules = {
  rules: {
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
}

const filesToIgnore = {
  ignores: ['node_modules/*', '.next/*', 'dist/*', 'coverage/*'],
}

const eslintConfig = [...baseConfig, customRules, filesToIgnore]

export default eslintConfig
