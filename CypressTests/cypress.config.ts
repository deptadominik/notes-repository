import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '2r6axh',
  e2e: {
    baseUrl: 'http://localhost:8000',
    supportFile: 'cypress/support/e2e.ts'
  }
})