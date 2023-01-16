const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  username: 'nsavi',
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
    baseUrl: 'https://www.saucedemo.com/',
    apiUrl: 'https://gorest.co.in/public/v2/',
    supportFile: 'cypress/support/e2e.js',
  },
});
