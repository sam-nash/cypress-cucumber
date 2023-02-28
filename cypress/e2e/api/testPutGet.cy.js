import { faker } from '@faker-js/faker'; //We'll use faker to randomise the data
//import the test data request
import putData from '../../fixtures/apiPutData.json';
//provides a context of the feature/api that is being tested
describe('Valid User update tests using PUT & verify that the resource is updated using GET methods', () => {
  const newData = [
    //we already know that our test data file apiPutData.json has exactly 4 items so we..
    //..create an array having 4 keys with values that need to be updated one for each put request
    { name: `${faker.name.lastName()}` },
    { email: `${faker.internet.email()}` },
    { gender: 'female' },
    { status: 'active' },
  ];
  //We want to test and verify if different keys/values can be updated. Since we have 4 keys : name, gender, email and status..
  //..we will try to send 4 different put requests one for each key
  putData.forEach((item, i) => {
    //construct a put request body..
    const putReq = {
      ...item, //..with the original item
      ...newData[i], //but replace the attribute that needs to be updated with the new value
    };
    //The test case below ("it") prints the name of the key that is being updated on each PUT request
    it(`Update the ${Object.keys(putReq)[i + 1]} in this PUT request`, () => {
      cy.log(`This is the original resource : ${JSON.stringify(item)}`);
      //custom cypress command[cypress/support/commands.js] to send the api request
      cy.updateUser(putReq)
        .then((putResponse) => {
          cy.log(
            `This is the updated resource : ${JSON.stringify(putResponse.body)}`
          );
          expect(putResponse.status).to.eq(200);
          expect(putResponse.statusText).to.eq('OK');
          //verify if the request that was sent, has actually updated the resource
          expect(putReq).to.deep.equal(putResponse.body);
        })
        .then(() => {
          //send a get request using the id parameter
          cy.getUser(putReq.id).then((getResponse) => {
            //verify the expected response matches the actual response received from the api
            expect(putReq, 'The GET Response body: ').to.deep.equal(
              getResponse.body
            );
          });
        });
    });
  });
});
