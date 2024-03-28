# Cypress Integration with Vansah Test Management for Jira

This tutorial guides you through the process of integrating Cypress tests with Vansah Test Management for Jira to automatically send test case results. By following this setup, you can streamline your testing workflow, ensuring that test outcomes are recorded directly in Vansah.

## Prerequisites

- Make sure that [`Vansah`](https://marketplace.atlassian.com/apps/1224250/vansah-test-management-for-jira?tab=overview&hosting=cloud) is installed in your Jira workspace
- You need to Generate Vansah [`connect`](https://docs.vansah.com/docs-base/generate-a-vansah-api-token-from-jira-cloud/) token to authenticate with Vansah APIs.
- Node.js and npm installed
- Cypress installed in your project

## Configuration

1. `Setting Environment Variables`: Store your Vansah API token as an environment variable for security. Add the following to your .bashrc, .bash_profile, or .zshrc file:
```bash
export VANSAH_TOKEN='your_vansah_api_token_here'
```
2. `Cypress Configuration`: Modify your cypress.config.js to include Vansah specific configurations. Here's an example setup:

```js
// This configuration file is used to set up Cypress end-to-end (e2e) testing parameters,
// specifically for projects that integrate with Vansah Test Management for Jira.
// It leverages Cypress's `defineConfig` function to set various custom configuration options.

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // [Required] The `setupNodeEvents` function allows for custom modifications to the Cypress configuration
    // based on the project's specific needs before the tests are executed.
    setupNodeEvents(on, config) {
      // Specifies the base URL of the application under test, making it easier to reference during tests.
      // In this case, tests are aimed at a Selenium practice site hosted on Vansah's domain.
      config.baseUrl = 'https://selenium.vansah.io';

      // [Required] Sets the URL for the Vansah Connect API, allowing Cypress tests to send results directly to Vansah.
      config.vansahConnectURL = "https://prod.vansahnode.app"
      // [Required] The Vansah connect token is securely accessed from environment variables,
      // ensuring sensitive information is not hard-coded into the configuration.
      config.vansahConnectToken = process.env.VANSAH_TOKEN;

      // [Optional] Additional Vansah-specific configurations:
      // Defines the sprint name within Vansah where the test results will be recorded.
      config.vansahSprintName = 'SM Sprint 1'
      // Sets the testing environment name to help categorize the test runs.
      config.vansahEnvName = 'SYS'
      // Specifies the release name associated with the test runs for tracking purposes.
      config.vansahReleaseName = 'Release 24'

      //[Required] Returns the modified configuration object to be used by Cypress.
      return config
    }
  },
});

```
3. `Custom Commands`: Define a custom command in Cypress for sending the test results to Vansah. Place the command definition in commands.js and include it in your Cypress commands file. The custom command, [cy.sendResulttoVansah](/cypress/support/commands.js), is used to send test results.
4. `Test Implementation`: Write your tests in a [.cy.js](cypress/e2e/vansah-io.cy.js) file. Use cy.sendResulttoVansah in the afterEach hook to send test results after each test case.
```js
describe('Describe your Test Suite Headline', () => {

  //[Required] Define Vansah variables here
  let vansahJiraAsset = 'Test-2' //Currently set as Jira Issue Key, but can also be used for TestFolder or any other Issue key
  let result = "passed"
  let vansahTestCaseKey=''

  //[Required] Listen for test failures and update result variable accordingly
  Cypress.on('uncaught:exception', (err, runnable) => {
    result = "failed";

  })
  Cypress.on('fail', (err, runnable) => {
    result = "failed";

  })
  it('Your Test Case Headline', () => {    
    result = "passed"; // [Required] Set result to "passed" initially
    vansahTestCaseKey = 'Test-C6' // [Required] Set Test Case Key
    
    //Your Test logic

  });
  afterEach(() => {
   /**  
    * * This command constructs and sends an API request to Vansah to report test results.
    * {string} vansahJiraAsset - The key of the Jira issue or the ID of the test folder in Vansah Test Management.
    * {string} vansahTestCaseKey - The key of the test case in Vansah Test Management.
    * {string} result - The result of the test ('passed' or 'failed').
    * */
    cy.sendResulttoVansah(vansahJiraAsset,vansahTestCaseKey,result)
  })

});


```
5. Running Tests
To execute your Cypress tests and send results to Vansah:
```bash
npx cypress run

```
Or, if you prefer to use the Cypress Test Runner:
```bash
npx cypress open

```
## Conclusion

By following these steps, you can efficiently manage your test cases and results in Vansah Test Management for Jira, improving the visibility and traceability of your testing efforts.

For more details on Cypress and custom commands, visit the [Cypress documentation](https://docs.cypress.io/api/cypress-api/custom-commands). 
For Vansah specific configurations and API details, please refer to the [Vansah API documentation](https://apidoc.vansah.com/).
