import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
let apiKey, requestBody, stationId, expectedResponse;
Given("The endpoint url to create & retrieve stations", () => {});

//Positive Scenarios
When("A valid api key & request body {string} are sent to the API", (body) => {
  requestBody = JSON.parse(body); //parse the request body
  cy.createStation(apiKey, requestBody).as("postResponse"); //call the POST - Request cypress custom command with the api key and request body as parameters.
});

Then(
  "The response status code is {int}, a unique alphanumeric stationId is generated, rank and source_type are of type {string}",
  (statusCode, type) => {
    cy.get("@postResponse").then((response) => {
      //create an alias that stores the response received from the api
      expect(response.status).to.eq(statusCode); //verify the http status code
      stationId = response.body.ID; //store the stationId for later use to retrive the station for verification
      expect(stationId).to.match(/^[a-z0-9]+$/i); //regex to match the stationId alphanumeric format
      //cy.log(JSON.stringify(response.body)); //log the response on the console for debugging
      expect(response.body.rank).to.be.a(type); //verify that the rank & source_type response attribute are of a certain data type
      expect(response.body.source_type).to.be.a(type);
    });
  }
);
And("The response body contains the request attributes", () => {
  cy.get("@postResponse").then((response) => {
    //expect(response.body.user_id).to.eq(userId); //verify the userid who created the station if needed
    let {
      //destruct the json object so that the result object contains only the remaining attributes
      ID,
      updated_at,
      created_at,
      user_id,
      source_type,
      rank,
      ...actualResponse
    } = response.body;
    expect(requestBody, "The API Response : ").to.deep.equal(actualResponse); //assert that the response matches the request attributes
  });
});
Then(
  "When the unique stationId is queried using a GET request, the api returns a {int} status code",
  (statusCode) => {
    cy.getStation(stationId).as("getResponse"); //Call the GET API with the stationId created using the POST Request & store its response in an alias
    cy.get("@getResponse").then((response) => {
      //Retrive the alias and verify the status code
      expect(response.status).to.eq(statusCode);
    });
  }
);
And("The GET response body contains the message {string}", (body) => {
  expectedResponse = JSON.parse(body); //get the expected response from your feature file
  cy.get("@getResponse").then((response) => {
    let { id, created_at, updated_at, rank, ...responseBody } = response.body; //destruct the GET response so that it contains only few key-values
    expect(expectedResponse, "The GET API Response : ").to.deep.equal(
      responseBody //verify that the resultant object matches the expected response object. Use deep equals to match the entire object rather than individual key-value pairs
    );
  });
});

//Negative Scenarios
//1. Verify that when an invalid API key is sent to the POST API - it throws a http 401 and a relevant error message
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
