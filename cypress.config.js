const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  includeShadowDom: true,
  defaultCommandTimeout: 50000,
  taskTimeout: 80000,
  restartBrowserBetweenSpecFiles: true,
  pageLoadTimeout: 40000,
  hideXHR: false,
  failOnStatusCode: false,
  video: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // on('task', {
      //   // deconstruct the individual properties
      //   run() {
      //     try {
      //       const data = s3.listObjectsV2({Bucket: 'samtestnash' }).promise()
      //       console.log(data);
      //       return data; // For unit tests.
      //     } catch (err) {
      //       console.log("Error", err);
      //     }
      //   },
      // })
    },
    baseUrl: 'https://automationpractice.com',
    apiUrl: 'https://gorest.co.in/public/v2/',
    supportFile: 'cypress/support/e2e.js',
  },
});
