module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react'
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
}