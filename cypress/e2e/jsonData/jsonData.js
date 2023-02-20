let apiKey, requestData, stationId, expectedResponse;
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
});

When('I post the station data request body to the Create Stations API', () => {
  //cy.wrap(requestData).each((request) => {
  requestData.forEach((request) => {
    cy.createStation(apiKey, request).as('postResponse');
  });
});

Then(
  'The response status code is {int}, a unique alphanumeric stationId is generated, rank and source_type are of type {string}',
  (statusCode, type) => {
    cy.get('@postResponse').then((response) => {
      //create an alias that stores the response received from the api.
      expect(response.status).to.eq(statusCode); //verify the http status code
      stationId = response.body.ID; //store the stationId for later use to retrive the station for verification
      expect(stationId).to.match(/^[a-z0-9]+$/i); //regex to match the stationId alphanumeric format
      //cy.log(JSON.stringify(response.body)); //log the response on the console for debugging
      expect(response.body.rank).to.be.a(type); //verify that the rank & source_type response attribute are of a certain data type
      expect(response.body.source_type).to.be.a(type);
    });
  }
);
