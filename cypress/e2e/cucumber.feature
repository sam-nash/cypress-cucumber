Feature: Creation of Stations using the /stations endpoint
    Scenario: Create weather stations by sending POST request to the API and then verify the response using the GET request
        Given I have the following station data to post:
            | external_id  | name                       | latitude | longitude | altitude |
            | DEMO_TEST001 | Team Demo Test Station 001 | 33.33    | -122.43   | 222      |
            | DEMO_TEST002 | Team Demo Test Station 002 | 44.44    | -122.44   | 111      |
        When I post the station data request body to the Create Stations API, then I receive a response status code 201 and an unique alphanumeric stationId in the response
        Then When the unique stationId is queried using a GET request, the api returns a 200 status code

    Scenario: Invalid API requests tot he POST endpoint throw valid error
        Given I have the following station data to post:
            | apiKey  | external_id     | name                       | latitude | longitude | altitude | statusCode | statusMessage |
            | invalid | Invalid_TEST001 | Team Demo Test Station 001 | 33.33    | -122.43   | 222      | 401        | Error         |
        When I post the station data request body to the Create Stations API, then I receive a corresponding response statusCode and statusMessage in the response