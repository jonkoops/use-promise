import type { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}

export default config
