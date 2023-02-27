//import the test data request and the response
import { createUser, createUserStatus } from "../../fixtures/apiPostData";
//instantiates the request - the result is an array of objects
let userCreateRequest = createUser();

describe("Valid User creation tests using POST & verify that the resource is created using GET methods", () => {
  //provides a context of the feature/api that is being tested
  userCreateRequest.userData.forEach((testData) => {
    //run the code block once per each test data array object
    it(`${testData.TestCase}`, () => {
      //use the spread operator to assign to apiRequest only the request object that the api accepts
      let { TestCase, ExpectedResult, ...apiRequest } = testData;
      cy.log(JSON.stringify(apiRequest)); //print the request for debugging
      //send the api POST request
      cy.createUser(apiRequest) //custom cypress command[cypress/support/commands.js] to send the api request
        .then((postResponse) => {
          //verify the exected response *status* attributes like code, text, unique Id
          createUserStatus(postResponse);
          //remove the id parameter from the response
          let { id, ...expectedResponse } = postResponse.body;
          //verify the expected response api request object) matches the actual response
          expect(apiRequest, "The POST Response body: ").to.deep.equal(expectedResponse
          );
        })
        .then((postResponse) => {
          //send the api GET request using the newly created user id
          cy.getUser(postResponse.body.id).then((getResponse) => {
            //remove the id parameter from the response
            let { id, ...expectedResponse } = getResponse.body;
            //verify the expected response matches the actual response
            expect(apiRequest, "The POST Response body: ").to.deep.equal(expectedResponse
              
            );
            expect(postResponse).to.deep.equal(getResponse);
          });
        });
    });
  });
});
