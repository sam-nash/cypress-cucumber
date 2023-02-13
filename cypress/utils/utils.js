export const responseObject = (key, value) => {
  response.find((object) => object[key] === value);
};

export const findThatUser = (iD) => {
  let expectedData,
    nextPage,
    userFound = false;
  cy.getUsers(nextPage).then((response) => {
    expectedData = response.body.find((object) => object.id === iD);

    if (expectedData != undefined) {
      userFound = true;
      console.log(expectedData);

      return expectedData;
    }

    if (!userFound) {
      nextPage = response.headers['x-links-next'];

      while (nextPage && !userFound) {
        cy.getUsers(nextPage).then((nextResponse) => {
          expectedData = nextResponse.body.find((object) => object.id === iD);
          if (expectedData != undefined) {
            userFound = true;

            return expectedData;
          }
          nextPage = response.headers['x-links-next'];
        });
      }
    }
  });
};
