it("Twitter API", () => {
  cy.request({
    url: "https://api.twitter.com/2/users/by/username/nsavinash",

    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + "YXZpbm5zQGdtYWlsLmNvbTpOYXNoQDEyMwo=",
    },
    failOnStatusCode: false,
  }).then((response) => {
    cy.log(response);
  });
});
