const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require('cypress');
module.exports = {
  e2e: {
    baseUrl: 'http://api.openweathermap.org/data/3.0/stations', //update the endpoint Url of the system under test
    reporter: 'cypress-mochawesome-reporter', //This is a simple reporter. Unlike other reporters this hides all complexities & generates a simple html report
    reporterOptions: {
      //the report options
      reportDir: 'cypress/reports', //location where you'd like the report to be generated and saved
      charts: true, //creates pies that display pass/fail tests
      reportPageTitle: 'Test Report', //Browser Title of the report
      embeddedScreenshots: true, //embeds screenshots for failed tests. Useful for UI tests
      inlineAssets: true, //Inline report assets (scripts, styles)
      code: true, //do|n't display code in the report
    },
    video: false,
    specPattern: ['cypress/e2e/*.feature', 'cypress/default/*.cy.js'], //specifies the location and type of specs to look for
    setupNodeEvents(on, config) {
      //this registers the plugins for use in your test
      on('file:preprocessor', cucumber());
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
};
