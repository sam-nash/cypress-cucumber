const { defineConfig } = require('cypress')
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' })
const s3 = new AWS.S3()
module.exports = defineConfig({
  chromeWebSecurity: false,
  username: 'nsavi',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // deconstruct the individual properties
        run() {
          try {
            const data = s3.listObjectsV2({Bucket: 'samtestnash' }).promise()
            console.log(data);
            return data; // For unit tests.
          } catch (err) {
            console.log("Error", err);
          }
        },
      })
    },
    baseUrl: 'https://www.saucedemo.com/',
    supportFile: false,
  },
})
