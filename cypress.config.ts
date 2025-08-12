// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // This is the standard place for Cypress plugins.
      // Since we have none, we can leave the function empty
      // or remove the unused 'on' and 'config' parameters if our linter allows.
      // For now, leaving them is fine. We can also disable the lint rule.

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = [on, config]; // A common trick to mark variables as "intentionally unused"
    },
  },
});