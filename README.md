# Cypress

## Installation and Running

**Install**

```
npm i --save-dev cypress@latest
```

**Open in Cypress Test Runner(GUI)**

```
npx cypress open
```

**Run tests in headless mode**

> All the tests in the e2e folder

```
npx cypress run
```

> Specific tests

```
npx cypress run --spec /path/to/the test(s)

example : npx cypress run --spec cypress/e2e/api/apiPostTest.cy.js
```

## UI Test Samples

[TBD]

## Amazon Web Services Test Samples

The code samples in awsServices.js, cypress.config.js and awsServices.cy.js demonstrate how to make use of Cypress to upload/download/list and delete objects from a S3 bucket.

### Pre - Requisites

**S3**

1. An S3 bucket is pre-created in a region of your choice.
2. AWS Credentials are configured on your machine.

[Refer AWS Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

Test AWS Credential set up :

```cd /Users/username/.aws

```

```
username@Air .aws % ls -al
drwxr-xr-x   4 username  staff   128 24 Oct 22:47 .
drwxr-xr-x+ 50 username  staff  1600  2 Feb 10:23 ..
-rw-------   1 username  staff    70 24 Oct 22:47 config
-rw-------   1 username  staff   116 23 Oct 22:08 credentials
```

All the aws sdk code has been referenced from
[AWS SDK for JavaScript V3 code examples](https://docs.amazonaws.cn/en_us/sdk-for-javascript/v3/developer-guide/javascript_code_examples.html).

Read 📚 this [tutorial](https://link.medium.com/ZsRYkUGehxb) to learn how this is done.


## Cypress API Test Samples

Demonstrate how to use Cypress for API Test Automation.

**_ Part 1 _** consists of API schema validation tests using a simple json schema and a json message as input. The tests will print an error log of all the schema error if the json message does not conform to the schema & fail then test.

**_ Part 2 _** consists of basic API tests using a simple json object as input for POST, PUT methods and then GET method to retrive the created/updated data, & then finally DELETE method to delete the created data(and also verify that the data has been deleted).

**_ Part 3 _** consists of variations in test scenarios and how different test data combinations are sent to the api endpoints to test POST, PUT and GET methods for each scenario. This will help you understand how to perform data driven testing using Cypress.

We'll add assertions to :
-- Verify the http status code and any response messages sent back by the API as acknowledgement.
-- Verify the response body to verify the json response data returned by the api(presence of keys & verification of values)

### Pre - Requisites

1. git clone https://github.com/sam-nash/Cypress.git
2. cd your_project
3. npm i
4. Install "ajv"

   ```
   npm i --save-dev ajv

   ```

5. Generate a token for accessing this api and store this in the _cypress.env.json_ file at the root of the project folder.
6. Do not checkin this file to the repo. Use your CICD pipeline to auto generate this file for you each time.

#### About the API under test

We'll make use of the [Users API](https://gorest.co.in/public/v2/users) for our testing.
The API has endpoints to :

- Create an user(POST)
  - Takes
- Update an user(PUT),
- Retrive an user(GET)
- Delete an user(DELETE)

The userCreate API expects a request with 4 attributes and returns a response that contains the same 4 request attributes that were sent plus an additional unique 'id' attribute.

#### Test Structure

1. **_Test Data_**: `cypress/fixtures/` - js functions that create and return test data(request & expected response)
2. Cypress commands : `cypress/support/commands.js` To create reusable request functions using cypress commands like cy.request. Hides the implementation details from the actual test. Helps keep the code clean with less information.
3. Assertions :crossed_swords: : That compare and verify the expected response with the actual.

#### Part 1 - Schema Tests

[TBD]

#### Part 2 - Simple API Tests

[TBD]

#### Part 3 Data driven API Tests

[TBD]

##### <u> Test Data generator functions</u>

-- createUser() function returns an array of requests so that multiple combinations of data can be tested.
-- createUserStatus() function takes the api response data as the function argument & validates various response attributes like status, statusText, isOkStatusCode and performs a regex match on the id from the response body.
-- The response body(without the 'id') is then finally asserted (deep equals) with the original request body.

#### POST Method

The code sample makes use of apiPostData.js fixture/test data file.

The test data has the request attributes that will be sent and the expected response attributes(status code, statusText etc) to be verified.

#### GET Method

The getUser endpoint receives an userId(resourceId) in the api endpoint url & responds back with the attributes of the user like name, gender, email, status and the unique id attribute.

#### Test Scenarios

1. Create an user and verify that the user gets created.

For this, we perform the following :

1. Send a postRequest to the createUser endpoint using 'POST' method.
2. Capture the postResponse and verify the response with the postRequest.
3. Send a getRequest to the getUser endpoint with the 'id' attribute in the url using the 'GET' method.
4. Capture the getResponse and verify the response with the postRequest(without 'id').

Because we have to test if the api can accept all the different values, we send variations of the request like a different 'gender' and 'status'.
The above test scenario can be broken up into 4 different test cases(scripts) by modifying the corresponding test data object
We achieve this by using the _createUser()_ function which creates different combinations of requests using faker.
