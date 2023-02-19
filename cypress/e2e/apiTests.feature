Feature: API Post with valid
    Scenario: Station 1 creation and validation
        Given The endpoint url to create & retrieve stations
        When A valid api key & request body '{"external_id": "SF_TEST001", "name": "San Francisco Test Station", "latitude": 37.76, "longitude": -122.43, "altitude": 150}' are sent to the API
        Then The response status code is 201, a unique alphanumeric stationId is generated, rank and source_type are of type "number"
        And The response user id is "63ef2a66c2990f0007b7b875" and the response body contains the request attributes
        Then When the unique stationId is queried using a GET request, the api returns a 200 status code
        And The GET response body contains the message '{"external_id": "SF_TEST001", "name": "San Francisco Test Station", "latitude": 37.76, "longitude": -122.43, "altitude": 150}'
    Scenario: Station creation with invalid api key
        Given The endpoint url to create & retrieve stations
        When An invalid api key is passed with the request body as: '{"external_id": "SF_TEST001", "name": "San Francisco Test Station", "latitude": 37.76, "longitude": -122.43, "altitude": 150}'
        Then The response status code is 401 and the error message is '{"cod":401,"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."}'