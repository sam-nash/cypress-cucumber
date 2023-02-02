const { defineConfig } = require('cypress');
const {
  listObjects,
  putObject,
  getObject,
  delObj,
  delObjs,
} = require('./cypress/utils/awsServices.js');

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
      on('task', {
        listObjects({ bucketName, prefix, delimiter }) {
          return new Promise(async (res, rej) => {
            res(listObjects(bucketName, prefix, delimiter));
          });
        },
        putObject({ file, bucketName, prefix, delimiter }) {
          return putObject(file, bucketName, prefix, delimiter);
        },
        getObject({ key, bucketName }) {
          return getObject(key, bucketName);
        },
        deleteObject(params) {
          return delObj(params);
        },
        deleteObjects(bucket) {
          return delObjs(bucket);
        },
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: 'https://automationpractice.com',
    apiUrl: 'https://gorest.co.in/public/v2/',
    supportFile: 'cypress/support/e2e.js',
  },
});
