const path = require('path');

const testFile1 = 'cypress/fixtures/apiPostData.js',
  testFile2 = 'cypress/fixtures/putTest.json',
  bucket = 'samtestnash';

it('Uploads a local file to a specified S3 bucket', () => {
  const params = {
    file: testFile2,
    bucket: bucket,
  };

  cy.S3PutObject(params).then((object) => {
    //expect(object['$metadata'].httpStatusCode).to.eq(200);
    if (object['$metadata'].httpStatusCode === 200) {
      cy.log('Upload Successful');
    }
  });
});

it('Uploads a local file to a specified S3 bucket as a nested object', () => {
  cy.log(
    'This test uploads the file to the bucket under the nested object(folder) folder1/folder2'
  );
  const params = {
    file: testFile1,
    bucket: bucket,
    prefix: 'folder1/folder2/',
    delimiter: '/',
  };

  cy.S3PutObject(params).then((object) => {
    //expect(object['$metadata'].httpStatusCode).to.eq(200);
    if (object['$metadata'].httpStatusCode === 200) {
      cy.log('Upload Successful');
    }
  });
});

it('Lists the objects in a S3 bucket', () => {
  const params = {
    Bucket: bucket,
  };

  cy.S3ListObjects(params).then((objects) => {
    cy.log('All S3 Objects in the bucket - *' + params.Bucket + '* are : ');
    cy.log(objects);
    const keys = objects.map(({ Key }) => Key);
    cy.log(keys);
  });
});

it('Downloads a specified object from a S3 bucket', () => {
  const params = {
    Bucket: bucket,
    Key: path.basename(testFile2),
  };
  cy.S3DownloadObject(params).then((objectData) => {
    cy.writeFile('cypress/fixtures/S3Download.json', objectData);
  });
});

it('Deletes an object from a specified S3 bucket', () => {
  const params = {
    Bucket: bucket,
    Key: path.basename(testFile2),
  };
  cy.S3DeleteObject(params).then((result) => {
    cy.log(result);
  });
});
