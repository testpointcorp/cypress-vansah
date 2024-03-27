// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Adding a custom command to add a test run
Cypress.Commands.add('addTestRunFromJiraIssue', (caseKey) => {

  return cy.request({
    method:'POST',
    url: Cypress.config('vansahConnectURL')+'/api/v1/run', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization':Cypress.config('vansahConnectToken')
    },
    body:{
      "case": {
        "key": caseKey
    },
    "asset": {
      "type": "issue",
      "key": Cypress.config('vansahIssueKey'),
    }
    }, 
    failOnStatusCode: true
  }).then(response => {

    return cy.vansahlog(response.body.message)
  });
});

Cypress.Commands.add('addTestlog', { prevSubject: 'true' }, (preSubject) => {
  // Use a cy.then() to properly chain Cypress commands
  return cy.then(() => {
    // Check if a previous subject was provided
    if (preSubject) {
      // Use the result of the previous command
      cy.log('This is from previous context', preSubject);
    } else {
      // If no previous subject was provided, perform a default action
      cy.log('No previous context provided');
    }
  });
});

Cypress.Commands.add('vansahlog',(item)=>{

  const filename = 'vansah-log.json'
  cy.writeFile(filename,{})
  cy.readFile(filename).then((item) => {
    
    // write the merged array
    cy.writeFile(filename, item)
  })

});
