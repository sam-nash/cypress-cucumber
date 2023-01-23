# Cypress

## Cypress Code Samples

### Pre - Requisites

1. git clone https://github.com/sam-nash/Cypress.git
2. cd your_project
3. npm i
5. Generate a token for accessing this api and store this in the _cypress.env.json_ file at the root of the project folder.
6. Do not checkin this file to the repo. Use your CICD pipeline to auto generate this file for you each time.

### Test Structure

1. Test Data : cypress/fixtures/ - js functions that return the test data(request json object & response attributes)
2. Cypress commands : To create a reusable request function with the necessary cypress commands like cy.request. Hides the implementation details from the actual test. Helps keep the code clean with less information
3. Assertions : That compare and verify the expected response with the actual.

#### POST Method

The code sample makes use of apiPostData.js fixture/test data file.

The userCreate API expects a request with 4 attributes and returns a response that contains the same 4 request attributes that were sent plus an additional unique 'id' attribute.

The test data has the request attributes that will be sent and the expected response attributes(status code, statusText etc) to be verified.

##### Test Data generator functions

-- createUser() function returns an array of requests so that multiple combinations of data can be tested.
-- createUserStatus() function takes the api response data as the function argument & validates various response attributes like status, statusText, isOkStatusCode and performs a regex match on the id from the response body.
-- The response body(without the 'id') is then finally asserted (deep equals) with the original request body.

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
The above test scenario can be broken up into 4 different test cases(scripts).
We achieve this by using the *createUser()* function which creates different combinations of requests using faker.
