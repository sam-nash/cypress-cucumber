//import the test data request and the response
import { createUser, createUserStatus } from '../../fixtures/apiPostData';
//instantiates the request - the result is an array of objects
let userCreateRequest = createUser();
const filename = 'cypress/fixtures/apiPutData.json';

describe('Valid User creation tests using POST & verify that the resource is created using GET methods', () => {
  //provides a context of the feature/api that is being tested
  userCreateRequest.userData.forEach((testData) => {
    //run the code block once per each test data array object
    it(`${testData.TestCase}`, () => {
      //use the spread operator to assign to apiRequest only the request object that the api accepts
      let { TestCase, ExpectedResult, ...apiRequest } = testData;
      //cy.log(JSON.stringify(apiRequest)); //enable if you want to print the request for debugging
      //send the api POST request
      cy.createUser(apiRequest) //custom cypress command[cypress/support/commands.js] to send the api request
        .then((postResponse) => {
          //cy.log(postResponse.body); //enable if you want to print the response body to console
          //verify the exected response *status* attributes like code, text, unique Id
          createUserStatus(postResponse);
          //write each response merged to a file for a later use
          cy.readFile(filename).then((file) => {
            file.push(postResponse.body);
            cy.writeFile(filename, file);
          });
          //remove the id parameter from the response
          let { id, ...actualResponse } = postResponse.body;
          //verify the expected response api request object) matches the actual response
          expect(apiRequest, 'The POST Response body: ').to.deep.equal(
            actualResponse
          );
        });
    });
  });

  it('Get Request for each id and verify the response', () => {
    cy.readFile(filename).then((file) => {
      file.forEach((testItem) => {
        //for each data object
        cy.getUser(testItem.id).then((getResponse) => {
          //send a get request using the id parameter
          //verify the expected response matches the actual response received from the api
          expect(testItem, 'The GET Response body: ').to.deep.equal(
            getResponse.body
          );
        });
      });
    });
  });
});
