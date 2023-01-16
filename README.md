# Cypress

## Cypress Code Samples

### Pre - Requisites
1. Generate a token for accessing this api and store this in the *cypress.env.json* file at the root of the project folder.
2. Do not checkin this file to the repo. Use your CICD pipeline to auto generate this file for you each time.

### Test Structure
1. Test Data : cypress/fixtures/ - js functions that return the test data(request json object & response attributes)
2. Cypress commands : To create a reusable request function with the necessary cypress commands like cy.request. Hides the implementation details from the actual test. Helps keep the code clean with less information
3. Assertions : That compare and verify the expected response with the actual.\

#### POST Method

The code sample makes use of apiPostData.js fixture/test data file.

The userCreate API expects a request with 4 attributes and returns a response that contains the same 4 request attributes that were sent plus an additional unique 'id' attribute.

The test data has the request attributes that will be sent and the expected response attributes(status code, statusText etc) to be verified.

-- createUser() function returns an array of requests so that multiple combinations of data can be tested.
-- createUserStatus() function takes the api response data as the function argument & validates various response attributes like status, statusText, isOkStatusCode and performs a regex match on the id from the response body.
-- The response body(without the 'id' ) is then finally asserted (deep equals) with the request body.
