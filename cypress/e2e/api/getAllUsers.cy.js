it.skip("Get all Users from the default(first) page & print their name and id", () => {
  cy.getUsers().then((response) => {
    cy.log(
      `The response header x-links-next has the value : ${response.headers["x-links-next"]}`
    );
    response.body.forEach((user) => {
      cy.log(`The user ${user.name} has the id : ${user.id}`);
    });
  });
});

describe("GET request with pagination until a specific User ID is found", () => {
  let targetId;
  it('Get all Users from 50th page & prints the first user"s id', () => {
    cy.request("https://gorest.co.in/public/v2/users?page=50").then(
      (response) => {
        cy.log(response.body[1]);
        targetId = response.body[1].id;
        cy.log(
          `The response header x-links-next has the value : ${response.headers["x-links-next"]}`
        );
      }
    );
  });
  it("Send requests using pagination until a specific Id is found", () => {
    //const targetId = 189391; //The user Id being searched for which exists in Page 50
    let responseObject,
      foundId = false;

    function findUser(response) {
      const data = response.body;
      for (const item of data) {
        if (item.id === targetId) {
          foundId = true;
          responseObject = item;
          break;
        }
      }
      if (!foundId && response.headers["x-links-next"]) {
        const nextUrl = response.headers["x-links-next"];
        cy.request({
          method: "GET",
          url: nextUrl,
        }).then(findUser);
      }
    }

    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users",
    })
      .then(findUser)
      .then(() => {
        expect(foundId).to.be.true;
        cy.log(responseObject);
      });
  });
});

it.only("Get all Users from the default(first) page & print their name and id", () => {
  cy.request("https://gorest.co.in/public/v2/users").then((response) => {
    cy.log(response.allRequestResponses);
  });
});
