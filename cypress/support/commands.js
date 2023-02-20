// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* These custom commands abstract the cy.request implementation.
They use the endPoint Url from the cypress.config.js and the apiKey from the cypress.env.json
*/

// The createStation command takes an optional apiKey and mandatory request body as inputs

Cypress.Commands.add("createStation", (apiKey, requestBody) => {
  cy.request({
    //it then sends the request to the endpoint url specified in the baseUrl attribute of cypress.config.js with the apiKey and the request body
    method: "POST",
    url: Cypress.config("baseUrl"),
    qs: { appid: apiKey ?? Cypress.env("appid") }, //this was done to inject an invalid api key for negative tests. If there is no apiKey sent from the test-it defaults tot he apiKey from the env
    body: requestBody,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
  });
});

// The getStation command takes mandatory id param as path parameter
// The GET Station API returns the details of the specific stationId that was passed in the request

Cypress.Commands.add("getStation", (stationId) => {
  cy.request({
    method: "GET",
    url: `${Cypress.config("baseUrl")}/${stationId}`,
    qs: { appid: Cypress.env("appid") },
    failOnStatusCode: false,
  });
});

// The getStations command does not accept any parameters
// The GET Stations API returns all the stations created by the specific user

Cypress.Commands.add("getStations", (stationId) => {
  cy.request({
    method: "GET",
    url: `${Cypress.config("baseUrl")}`,
    qs: { appid: Cypress.env("appid") },
    failOnStatusCode: false,
  });
});

// The deleteStation command takes mandatory stationId as path parameter & performs a delete of the station.

Cypress.Commands.add("deleteStation", (stationId) => {
  cy.request({
    method: "DELETE",
    url: `${Cypress.config("baseUrl")}/${stationId}`,
    qs: { appid: Cypress.env("appid") },
    failOnStatusCode: false,
  });
});
