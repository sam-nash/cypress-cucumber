//import test data for the POST request
import { createStations } from "../fixtures/createStations";
//instantiates the request body - the result is an array of objects
let stationData = createStations(),
  stationId;

stationData.stations.forEach((stationData) => {
  it(`${stationData.TestCase}`, () => {
    let { TestCase, ...requestBody } = stationData;
    //cy.log(requestBody);
    //Post the api request
    cy.request({
      method: "POST",
      url: Cypress.config("baseUrl"),
      qs: { appid: Cypress.env("appid") },
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.ID).to.match(/^[a-z0-9]+$/i);
      expect(response.body.rank).to.be.a("number");
      expect(response.body.source_type).to.be.a("number");
      expect(response.body.user_id).to.eq("63ef2a66c2990f0007b7b875");
      //cy.log(JSON.stringify(response.body));
      let {
        ID,
        updated_at,
        created_at,
        user_id,
        source_type,
        rank,
        ...responseBody
      } = response.body;
      expect(responseBody, "The API Response : ").to.deep.equal(requestBody);
      stationId = response.body.ID;
      cy.getStation(stationId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(stationId);
        let { id, created_at, updated_at, rank, ...responseBody } =
          response.body;
        expect(requestBody, "The API Response : ").to.deep.equal(responseBody);
        cy.log(JSON.stringify(response.body));
      });
    });
  });
});
