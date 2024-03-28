/**
 * Custom command to send test results to Vansah Test Management for Jira.
 * This command constructs and sends an API request to Vansah to report test results.
 * @param {string} vansahJiraAsset - The key of the Jira issue or the ID of the test folder in Vansah Test Management.
 * @param {string} vansahTestCaseKey - The key of the test case in Vansah Test Management.
 * @param {string} result - The result of the test ('passed' or 'failed').
 * @returns {Promise} - A promise resolving with the API response.
 */
Cypress.Commands.add('sendResulttoVansah', (vansahJiraAsset, vansahTestCaseKey, result) => {
  // Construct the base request body
  let requestBody = {
    "case": {
      "key": vansahTestCaseKey
    },
    "asset": {},
    "result": {
      "name": result
    },
    "properties": {}
  };

  // Check if vansahJiraAsset is a Jira issue key (contains only one hyphen)
  if (vansahJiraAsset.split('-').length === 2) {
    // If vansahJiraAsset contains only one hyphen, it is a Jira issue key
    // Update the asset object with the issue key
    requestBody.asset = {
      "type": "issue",
      "key": vansahJiraAsset
    };
  } else {
    // If vansahJiraAsset contains more than one hyphen, it is assumed to be a TestFolder ID
    // Update the asset object with the test folder ID
    requestBody.asset = {
      "type": "folder",
      "identifier": vansahJiraAsset
    };
  }
  // Check and include environment property if available
  if (Cypress.config('vansahEnvName')) {
    requestBody.properties.environment = {
      "name": Cypress.config('vansahEnvName')
    };
  }

  // Check and include release property if available
  if (Cypress.config('vansahReleaseName')) {
    requestBody.properties.release = {
      "name": Cypress.config('vansahReleaseName')
    };
  }

  // Check and include sprint property if available
  if (Cypress.config('vansahSprintName')) {
    requestBody.properties.sprint = {
      "name": Cypress.config('vansahSprintName')
    };
  }

  // Perform the API request
  return cy.request({
    method: 'POST',
    url: Cypress.config('vansahConnectURL') + '/api/v1/run',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Cypress.config('vansahConnectToken')
    },
    body: requestBody,
    failOnStatusCode: false // Do not fail on non-2xx status codes
  }).then(response => {
    // Check if the response status code is 2xx
    if (response.status === 200) {
      // Log the success message
      cy.log('Test result sent successfully to Vansah.');
    } else {
      // Log the error message
      cy.log(`Failed to send test result to Vansah. Status code: ${response.status}, Message: ${response.body.message}`);
    }
  });
});
