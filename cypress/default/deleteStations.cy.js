it('First gets all stations & stores the station Ids in an array', () => {
  cy.getStations().then((response) => {
    response.body.forEach((station) => {
      cy.log(station.id);
      cy.deleteStation(station.id).then((response) => {
        cy.log(response.status);
      });
    });
  });
});
