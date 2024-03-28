// This configuration file is used to set up Cypress end-to-end (e2e) testing parameters,
// specifically for projects that integrate with Vansah Test Management for Jira.
// It leverages Cypress's `defineConfig` function to set various custom configuration options.

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // The `setupNodeEvents` function allows for custom modifications to the Cypress configuration
    // based on the project's specific needs before the tests are executed.
    setupNodeEvents(on, config) {
      // Specifies the base URL of the application under test, making it easier to reference during tests.
      // In this case, tests are aimed at a Selenium practice site hosted on Vansah's domain.
      config.baseUrl = 'https://selenium.vansah.io';

      // Sets the URL for the Vansah Connect API, allowing Cypress tests to send results directly to Vansah.
      config.vansahConnectURL = "https://prod.vansahnode.app"
      // The Vansah connect token is securely accessed from environment variables,
      // ensuring sensitive information is not hard-coded into the configuration.
      config.vansahConnectToken = process.env.VANSAH_TOKEN;

      // Additional Vansah-specific configurations:
      // Defines the sprint name within Vansah where the test results will be recorded.
      config.vansahSprintName = 'SM Sprint 1'
      // Sets the testing environment name to help categorize the test runs.
      config.vansahEnvName = 'SYS'
      // Specifies the release name associated with the test runs for tracking purposes.
      config.vansahReleaseName = 'Release 24'

      // Returns the modified configuration object to be used by Cypress.
      return config
    }
  },
});
