describe('Verify Table data in Selenium Website Testing Page', () => {

  //Define Vansah variables here
  let vansahJiraAsset = 'Test-2' //Currently set as Jira Issue Key, but can also be used for TestFolder or any other Issue key
  let result = "passed"
  let vansahTestCaseKey=''

  // Listen for test failures and update result variable accordingly
  Cypress.on('uncaught:exception', (err, runnable) => {
    result = "failed";

  })
  Cypress.on('fail', (err, runnable) => {
    result = "failed";

  })
  it('Verify Privacy Policy Version and Date', () => {    
    result = "passed"; // Set result to "passed" initially
    vansahTestCaseKey = 'Test-C6' //Set Test Case Key
    
    //Open the application's homepage.
    cy.visit('/')
   
    //Identify the section of the page containing the privacy policy table.
    cy.get('.elementor-element-47a29eb > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > h2').scrollIntoView({ easing: 'linear' })
    
    //Retrieve the privacy policy version and date from the table.
    cy.get('#tablepress-1 > tbody > tr.row-2 > td.column-2').invoke('text').should('eql','TP.08072020.01')
    cy.get('#tablepress-1 > tbody > tr.row-2 > td.column-3').invoke('text').should('eql','08/July/2020')

  });
  it('Verify Data Privacy Version and Date', () => {
    result = "passed";  // Set result to "passed" initially
    vansahTestCaseKey = 'Test-C7' //Set Test Case Key

    //Updating the Asset details for this Test Case - Test Folder name : TEST/demo testfolder/
    vansahJiraAsset = 'b97fe80b-0b6a-11ee-8e52-5658ef8eadd5'  //This is a Test Folder Identifier 
    
    //Open the application's homepage.
    cy.visit('/')
   
    //Identify the section of the page containing the data privacy table.
    cy.get('.elementor-element-47a29eb > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > h2').scrollIntoView({ easing: 'linear' })
    
    //Retrieve the data privacy version and date from the table.
    cy.get('#tablepress-1 > tbody > tr.row-3 > td.column-2').invoke('text').should('eql','TP.03032022.01')
    cy.get('#tablepress-1 > tbody > tr.row-3 > td.column-3').invoke('text').should('eql','03/March/2022')
    


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

