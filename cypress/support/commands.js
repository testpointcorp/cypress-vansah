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
Cypress.Commands.add('addTestRun', (caseKey, issue) => {
    return cy.request('https://prod.vansahnode.app/atlassian-connect.json').then(response => {
    // Process the response and return the desired value
   // cy.log('Response from addTestRun:', response.body);
    return response.body.key;
  });
});

Cypress.Commands.add('addTestlog', { prevSubject: 'optional' }, (preSubject) => {
    // Use a cy.then() to properly chain Cypress commands
    return cy.then(() => {
        cy.log('This is from previous context', preSubject);
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
