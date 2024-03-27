const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      

      //Vansah Connect URL and Token
       config.vansahConnectURL = "https://prod.vansahnode.app"
       //Assigning and accessing the Vansah connect token from Env. variables
       config.vansahConnectToken = process.env.VANSAH_TOKEN;
      //Vansah Test Run Properties
      //TestFolder ID
      config.vansahTestFolderID = 'b97fe80b-0b6a-11ee-8e52-5658ef8eadd5'
      //Issue Key
      config.vansahIssueKey = 'TEST-1'
      //Sprint Name
      config.vansahSprintName = 'TEST Sprint 1'
      //Environment Name
      config.vansahEnvName = 'SYS'
      //Release Name
      config.vansahReleaseName = 'Release 24'
      
      return config
    }
  },
});
