import globals from 'globals'

import typescriptConfig from './typescript.js'

export default [
  ...typescriptConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
