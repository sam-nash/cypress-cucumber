import { createUser, createUserStatus } from '../../fixtures/apiPostData'; //import the test data request and the response
let userCreateRequest = createUser(); //instantiates the request - the result is an array of objects

describe('User creation using POST method', () => { //provides a context of the feature/api that is being tested
  userCreateRequest.userData.forEach((testData) => { //run the code block once per each test data array object
    it(`${testData.TestCase}`, () => { //this prints the test case name
      let { TestCase, ExpectedResult, ...apiRequest } = testData; //remove the request atributes that the api does not want
      cy.log(JSON.stringify(apiRequest)); //print the request for debugging
      cy.createUser(apiRequest).then((apiResponse) => { //post the api request
        createUserStatus(apiResponse); //verify the exected response status attributes
        let { id, ...expectedResponse } = apiResponse.body; //remove the id parameter from the response
        expect(expectedResponse, 'The Response body: ').to.deep.equal( //verify the expected response matches the actual response
          apiRequest
        );
      });
    });
  });
});
