Feature: Create Weather stations with valid details
    Scenario: Station DEMO 1 creation and validation
        Given The endpoint url to create & retrieve stations
        When A valid api key & request body '{ "external_id": "DEMO_TEST001","name": "Team Demo Test Station 001","latitude": 33.33,"longitude": -122.43,"altitude": 222 }' are sent to the API
        Then The response status code is 201, a unique alphanumeric stationId is generated, rank and source_type are of type "number"
        And The response body contains the request attributes
        Then When the unique stationId is queried using a GET request, the api returns a 200 status code
        And The GET response body contains the message '{ "external_id": "DEMO_TEST001","name": "Team Demo Test Station 001","latitude": 33.33,"longitude": -122.43,"altitude": 222 }'
    Scenario: Station DEMO 2 creation and validation
        Given The endpoint url to create & retrieve stations
        When A valid api key & request body '{ "external_id": "DEMO_TEST002","name": "Team Demo Test Station 002","latitude": 44.44,"longitude": -122.44,"altitude": 111 }' are sent to the API
        Then The response status code is 201, a unique alphanumeric stationId is generated, rank and source_type are of type "number"
        And The response body contains the request attributes
        Then When the unique stationId is queried using a GET request, the api returns a 200 status code
        And The GET response body contains the message '{ "external_id": "DEMO_TEST002","name": "Team Demo Test Station 002","latitude": 44.44,"longitude": -122.44,"altitude": 111 }'
    Scenario: Station creation with invalid api key
        Given The endpoint url to create & retrieve stations
        When An invalid api key is passed with the request body as: '{"external_id": "SF_TEST001", "name": "San Francisco Test Station", "latitude": 37.76, "longitude": -122.43, "altitude": 150}'
        Then The response status code is 401 and the error message is '{"cod":401,"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."}'