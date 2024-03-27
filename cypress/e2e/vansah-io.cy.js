describe('Test Vansah IO page', () => {
  it('Verify `Tab #2` contents', () => {
    
    cy.visit('https://selenium.vansah.io/').addTestRunFromJiraIssue('TEST-C1');
    //Clicks on Tab #2 button
  
    cy.contains('Tab #2').click()

    //Verify Tab #2 contents
    cy.get('#elementor-tab-content-1342 > p').should('have.text', 'Contents for Tab 2').addTestlog()

  });

  });

