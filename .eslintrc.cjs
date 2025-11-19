/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution') // 通过commonjs导入

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'prefer-const': 0
  }
}
