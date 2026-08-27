import { configDefaults, defineConfig } from 'vitest/config'

const testExtensions = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}'

/** Shared Vitest configuration for Node-oriented packages. */
export default defineConfig({
  test: {
    environment: 'node',
    clearMocks: true,
    restoreMocks: true,
    include: [`**/*.{test,spec}.${testExtensions}`, `**/__tests__/**/*.${testExtensions}`],
    exclude: [
      ...configDefaults.exclude,
      '**/build/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/.output/**',
      '**/.vercel/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [`src/**/*.${testExtensions}`],
      exclude: [
        `src/**/*.d.${testExtensions}`,
        `src/**/*.{test,spec}.${testExtensions}`,
        `src/**/__tests__/**/*.${testExtensions}`,
      ],
    },
  },
})
