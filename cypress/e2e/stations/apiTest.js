let apiKey,
  requestData,
  stationIds = [],
  expectedResponse;
Given('I have the following station data to post:', (dataTable) => {
  // Convert the data table to an array of objects with header keys
  requestData = dataTable.hashes().map((row) => {
    // Convert string representation of numbers and floats to their respective types
    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (!isNaN(value)) {
        if (value.includes('.')) {
          row[key] = parseFloat(value);
        } else {
          row[key] = parseInt(value, 10);
        }
      }
    });
    return row;
  });
  cy.log(JSON.stringify(requestData));
  cy.wrap(requestData).as('requestData');
});

When(
  'I post the station data request body to the Create Stations API, then I receive a response status code {int} and an unique alphanumeric stationId in the response',
  (statusCode) => {
    cy.get('@requestData').each((request) => {
      cy.createStation(apiKey, request).then((response) => {
        //create an alias that stores the response received from the api.
        expect(response.status).to.eq(statusCode); //verify the http status code
        expect(response.body.ID).to.match(/^[a-z0-9]+$/i);
        //store the stationId for later use to retrive the station for verification
        stationIds.push(response.body.ID);
      });
    });
  }
);

Then(
  'When the unique stationId is queried using a GET request, the api returns a {int} status code',
  (statusCode) => {
    //Call the GET API with the stationId created using the POST Request & store its response in an alias
    stationIds.forEach((stationId) => {
      cy.getStation(stationId).then((response) => {
        expect(response.status).to.eq(statusCode); //verify the http status code
        let { id, created_at, updated_at, rank, ...responseBody } =
          response.body; //destruct the GET response so that it contains only few key-values
        expectedResponse = requestData.find(
          (requestObject) =>
            requestObject.external_id === responseBody.external_id
        );
      });
    });
  }
);

//Negative Test - Invalid API key
When(
  'I post the station data request body to the Create Stations API, then I receive a corresponding response statusCode and statusMessage in the response',
  () => {
    cy.get('@requestData').each((request) => {
      cy.log(JSON.stringify(request));
      let { apiKey, statusCode, statusMessage, ...requestData } = request;

      cy.createStation(request.apiKey, requestData).then((response) => {
        expect(response.status).to.eq(request.statusCode); //verify the http status code
        expect(JSON.stringify(response.body)).to.eq(request.statusMessage); //verify the status message
      });
    });
  }
);

//Negative Test - Invalid JSON attribute values
When(
  'I post the station data request body to the Create Stations API, then I receive a corresponding response statusCode and statusMessage in the response',
  () => {
    cy.get('@requestData').each((request) => {
      cy.log(JSON.stringify(request));
      let { apiKey, statusCode, statusMessage, ...requestData } = request;

      cy.createStation(request.apiKey, requestData).then((response) => {
        expect(response.status).to.eq(request.statusCode); //verify the http status code
        expect(JSON.stringify(response.body)).to.eq(request.statusMessage); //verify the status message
      });
    });
  }
);