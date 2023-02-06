const path = require("path");
const fs = require("fs");
const {
  ListObjectsV2Command,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client();
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

// function to list all objects in a AWS S3 bucket
// usage : takes mandatory bucketName and optional prefix and delimiter. Providing a prefix will list the contents inside the folders/nested folders of the bucket
const listObjects = async (bucketName, prefix, delimiter) => {
  const listParams = {
    Bucket: bucketName,
    Prefix: prefix ?? "",
    Delimiter: delimiter ?? "",
  };
  try {
    const data = await s3Client.send(new ListObjectsV2Command(listParams));
    return data.Contents;
  } catch (err) {
    console.log("If there is an Error, log the error on the console", err);
  }
};

// function to upload local objects to an AWS S3 bucket
// usage : takes mandatory bucketName, file and optional prefix and delimiter
async function putObject(file, bucketName, prefix, delimiter) {
  const filestream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: bucketName,
    Key: `${prefix ?? ""}${path.basename(file)}`,
    Body: filestream,
    Delimiter: delimiter ?? "",
  };
  try {
    const uploadData = await s3Client.send(new PutObjectCommand(uploadParams));
    return uploadData;
  } catch (err) {
    console.log("There is an Error", err);
  }
}

// function to download a specified object from S3 bucket
// usage : takes mandatory key, bucketName
async function getObject(key, bucketName) {
  const getParams = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    const data = await s3.getObject(getParams).promise();
    return data.Body.toString("utf-8");
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
    console.log("There is an Error", err);
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
    console.log("All Objects were successfully deleted.");
    return data;
  } catch (err) {
    console.log("Some Error", err);
  }
}

module.exports = { listObjects, putObject, getObject, delObj, delObjs };
