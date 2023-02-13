import { findThatUser } from '../../utils/utils';

it('Get all Users & assert that a certian user exists', () => {
  let expectedData,
    iD = 353699;
  cy.getUsers().then((response) => {
    expectedData = response.body.find((object) => object.id === iD);
    cy.log(expectedData);
    cy.log(typeof expectedData);
  });
});

it('Test the function', () => {
  let expectedData,
    iD = 353633;
  cy.log(findThatUser(iD));
});
