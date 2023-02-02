//This spec demonstrates the usage of Cypress to communicate with AWS Servcies like S3

it('Uploads a local file to a specified S3 bucket', () => {
  const file = 'cypress/fixtures/apiPostData.js',
    bucketName = 'samtestnash';

  cy.S3PutObject(file, bucketName).then((object) => {
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

  const file = 'cypress/fixtures/putTest.json',
    bucketName = 'samtestnash',
    prefix = 'folder1/folder2/',
    delimiter = '/';

  cy.S3PutObject(file, bucketName, prefix, delimiter).then((object) => {
    if (object['$metadata'].httpStatusCode === 200) {
      cy.log('Upload Successful');
    }
  });
});

it('Lists the objects in a S3 bucket ', () => {
  const bucketName = 'samtestnash';

  cy.S3ListObjects(bucketName).then((objects) => {
    cy.log('All S3 Objects in the bucket are : ');
    cy.log(objects);
    const keys = objects.map(({ Key }) => Key);
    cy.log('Print just the keys...');
    cy.log(keys);
  });
});

it('Lists the objects inside a folder in a S3 bucket', () => {
  const bucketName = 'samtestnash',
    prefix = 'folder1/folder2/',
    delimiter = '/';

  cy.S3ListObjects(bucketName, prefix, delimiter).then((objects) => {
    cy.log(
      'All S3 Objects inside the * `${prefix}` * in the bucket - `${bucketName}` are : '
    );
    const keys = objects.map(({ Key }) => Key);
    cy.log(keys);
  });
});

it('Downloads a specified object from a S3 bucket', () => {
  const key = 'folder1/folder2/putTest.json',
    bucketName = 'samtestnash';

  cy.S3GetObject(key, bucketName).then((objectData) => {
    cy.writeFile('cypress/fixtures/S3Download.json', objectData);
  });
});

it.skip('Deletes an object from a specified S3 bucket', () => {
  const params = {
    Bucket: bucket,
    Key: path.basename(testFile2),
  };
  cy.S3DeleteObject(params).then((result) => {
    cy.log(result);
  });
});
