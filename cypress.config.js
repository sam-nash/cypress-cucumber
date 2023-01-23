const { defineConfig } = require("cypress");

const {
  ListObjectsV2Command,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-southeast-2" });

//AWS List S3 Objects
async function listObjects(params) {
  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents;
  } catch (err) {
    console.log("If there is an Error, log the error on the console", err);
  }
}

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
      on("task", {
        listAWSS3Objects(params) {
          return new Promise(async (res, rej) => {
            res(listObjects(params));
          });
        },
      });
    },
    baseUrl: "https://automationpractice.com",
    apiUrl: "https://gorest.co.in/public/v2/",
    supportFile: "cypress/support/e2e.js",
  },
});
