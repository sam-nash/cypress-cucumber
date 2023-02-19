let stationIds = [];
it("First gets all stations & stores the station Ids in an array", () => {
  cy.request({
    url: Cypress.config("baseUrl"),
    qs: { appid: Cypress.env("appid") },
  }).then((response) => {
    response.body.forEach((station) => {
      stationIds.push(station.id);
    });
  });
  cy.log(stationIds);
});

it.skip("delete the stations", () => {
  for (var i = 0; i < stationIds.length; i++) {
    cy.request(
      "DELETE",
      "http://api.openweathermap.org/data/3.0/stations/" +
        stationIds[i] +
        "?appid=e7dbb5e48f543dab1f71e1164c5b33ad"
    ).then((response) => {
      cy.log(response.status);
    });
  }
});
