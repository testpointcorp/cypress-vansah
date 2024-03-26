// describe('Test Vansah IO page', () => {
//   it('Verify `Tab #2` contents', () => {
//     //cy.visit('https://selenium.vansah.io/');
//     cy.visit('https://example.cypress.io/todo');

//     // // Clicks on Tab #2 button
//     // cy.contains('Tab #2').click();

//     // //Verify Tab #2 contents
//     // cy.get('#elementor-tab-content-1342 > p').should('have.text', 'Contents for Tab 2')
//     cy.addTestRun('caseKey', 'issue').then(response => {
//       // Use the addTestlog command with the result of addTestRun as its previous subject
//       cy.addTestlog(response.body);
//     });
//   });

//   });
describe('Test Suite', () => {
  it('should test custom commands', () => {
    // Calling the parent command (addTestRun) first
    cy.addTestRun('caseKey', 'issue').then(response => {
      // Once the parent command is executed, calling the child command (addTestlog)
      cy.log(response);
      cy.addTestlog(response);
    });
  });
});

