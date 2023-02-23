Feature: Creation of Stations using the /stations endpoint
    Scenario: Create weather stations by sending POST request to the API and then verify the response using the GET request
        Given I have the following station data to post:
            | external_id  | name                       | latitude | longitude | altitude |
            | DEMO_TEST001 | Team Demo Test Station 001 | 33.33    | -122.43   | 222      |
            | DEMO_TEST002 | Team Demo Test Station 002 | 44.44    | -122.44   | 111      |
        When I post the station data request body to the Create Stations API, then I receive a response status code 201 and an unique alphanumeric stationId in the response
        Then When the unique stationId is queried using a GET request, the api returns a 200 status code

    Scenario: Invalid API key to the POST endpoint throw valid status code and error message
        Given I have the following station data to post:
            | apiKey  | external_id     | name                       | latitude | longitude | altitude | statusCode | statusMessage                                                                                              |
            | invalid | Invalid_TEST001 | Team Demo Test Station 001 | 33.33    | -122.43   | 222      | 401        | {"cod":401,"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."} |
        When I post the station data request body to the Create Stations API, then I receive a corresponding response statusCode and statusMessage in the response

    Scenario: Invalid JSON attributes to the POST endpoint throw valid status code and error message
        Given I have the following station data to post:
            | external_id     | name                       | latitude | longitude | altitude | statusCode | statusMessage                                                                              |
            | Invalid_TEST002 | Team Demo Test Station 002 | '33.33'  | -122.43   | 222      | 400        | {"code":400001,"message":"unmarshal type error: expected=float64, got=string, offset=89"}  |
            | Invalid_TEST003 | Team Demo Test Station 003 | 33.33    | '-122.43' | 222      | 400        | {"code":400001,"message":"unmarshal type error: expected=float64, got=string, offset=109"} |
            | Invalid_TEST004 | Team Demo Test Station 004 | 33.33    | -122.43   | '222'    | 400        | {"code":400001,"message":"unmarshal type error: expected=float64, got=string, offset=124"} |
            |                 | Team Demo Test Station 005 |          |           |          | 400        | {"code":400001,"message":"Bad external id"}                                                |
            | Invalid_TEST004 |                            |          |           |          | 400        | {"code":400001,"message":"Bad or zero length station name"}                                |
        When I post the station data request body to the Create Stations API, then I receive a corresponding response statusCode and statusMessage in the response
