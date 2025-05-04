const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pm4mju',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
