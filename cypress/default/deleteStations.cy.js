let stationIds = [];
it("First gets all stations & stores the station Ids in an array", () => {
  cy.getStations().then((response) => {
    response.body.forEach((station) => {
      stationIds.push(station.id);
    });
  });
  cy.log(stationIds);
});

it("delete the stations", () => {
  for (var i = 0; i < stationIds.length; i++) {
    cy.deleteStation(stationIds[i]).then((response) => {
      cy.log(response.status);
    });
  }
});
