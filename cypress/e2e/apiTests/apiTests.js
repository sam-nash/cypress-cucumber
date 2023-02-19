import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
let apiKey, requestBody, stationId, expectedResponse;
Given("The endpoint url to create & retrieve stations", () => {});

//Positive Scenarios
When("A valid api key & request body {string} are sent to the API", (body) => {
  requestBody = JSON.parse(body);
  cy.createStation(apiKey, requestBody).as("postResponse");
});

Then(
  "The response status code is {int}, a unique alphanumeric stationId is generated, rank and source_type are of type {string}",
  (statusCode, type) => {
    cy.get("@postResponse").then((response) => {
      expect(response.status).to.eq(statusCode);
      stationId = response.body.ID;
      expect(stationId).to.match(/^[a-z0-9]+$/i);
      cy.log(JSON.stringify(response.body));
      expect(response.body.rank).to.be.a(type);
      expect(response.body.source_type).to.be.a(type);
    });
  }
);
And(
  "The response user id is {string} and the response body contains the request attributes",
  (userId) => {
    cy.get("@postResponse").then((response) => {
      expect(response.body.user_id).to.eq(userId);
      let {
        ID,
        updated_at,
        created_at,
        user_id,
        source_type,
        rank,
        ...actualResponse
      } = response.body;
      expect(requestBody, "The API Response : ").to.deep.equal(actualResponse);
    });
  }
);
Then(
  "When the unique stationId is queried using a GET request, the api returns a {int} status code",
  (statusCode) => {
    cy.getStation(stationId).as("getResponse");
    cy.get("@getResponse").then((response) => {
      expect(response.status).to.eq(statusCode);
    });
  }
);
And("The GET response body contains the message {string}", (body) => {
  expectedResponse = JSON.parse(body);
  cy.get("@getResponse").then((response) => {
    let { id, created_at, updated_at, rank, ...responseBody } = response.body;
    expect(expectedResponse, "The GET API Response : ").to.deep.equal(
      responseBody
    );
  });
});

//Negative Scenarios
When(
  "An invalid api key is passed with the request body as: {string}",
  (body) => {
    const requestBody = JSON.parse(body);
    apiKey = "invalid";
    cy.createStation(apiKey, requestBody).as("postResponse");
  }
);

Then(
  "The response status code is {int} and the error message is {string}",
  (statusCode, error) => {
    cy.get("@postResponse").then((response) => {
      expect(response.status).to.eq(statusCode);
      expect(JSON.stringify(response.body)).to.eq(error);
    });
  }
);
