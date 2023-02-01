const { defineConfig } = require('cypress');
const path = require('path');
const fs = require('fs');

const {
  ListObjectsV2Command,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: 'ap-southeast-2' });

// List Objects from an AWS S3 bucket
async function listObj(params) {
  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents;
  } catch (err) {
    console.log('If there is an Error, log the error on the console', err);
  }
}

//Uploads local objects to an AWS S3 bucket
async function putObj(params) {
  const filestream = fs.createReadStream(params.file);
  const uploadParams = {
    Bucket: params.bucket,
    Key: (params.prefix ? params.prefix : '') + path.basename(params.file),
    Body: filestream,
    Delimiter: params.delimiter ? params.delimiter : '',
  };
  try {
    const uploadData = await s3Client.send(new PutObjectCommand(uploadParams));
    return uploadData;
  } catch (err) {
    console.log('There is an Error', err);
  }
}

//Download a specified object from S3 bucket
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
async function getObj(params) {
  try {
    const data = await s3.getObject(params).promise();
    return data.Body.toString('utf-8');
  } catch (err) {
    return err;
  }
}

//Delete a specific object from a specified bucket
async function delObj(params) {
  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    return data;
  } catch (err) {
    console.log('There is an Error', err);
  }
}

//Delete all objects from a specified bucket - useful for post test clean up activities
async function delObjs(bucket) {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucket));
    let allObjects = data.Contents;
    for (let i = 0; i < allObjects.length; i++) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: allObjects[i].Key,
        })
      );
    }
    console.log('All Objects were successfully deleted.');
    return data;
  } catch (err) {
    console.log('Some Error', err);
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
      on('task', {
        listObjects(params) {
          return new Promise(async (res, rej) => {
            res(listObj(params));
          });
        },
        putObject(params) {
          // return new Promise(async (res, rej) => {
          //   res(putObj(params));
          // });
          return putObj(params);
        },
        getObject(params) {
          // return new Promise(async (resolve, reject) => {
          //   const file = await getObj(params);
          //   resolve(file);
          // });
          return getObj(params);
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
