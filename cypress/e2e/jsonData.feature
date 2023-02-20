Feature: Posting data to an API
    Scenario: Posting data to the API and verifying the response
        Given I have the following station data to post:
            | external_id  | name                       | latitude | longitude | altitude |
            | DEMO_TEST001 | Team Demo Test Station 001 | 33.33    | -122.43   | 222      |
            | DEMO_TEST002 | Team Demo Test Station 002 | 44.44    | -122.44   | 111      |
        When I post the station data request body to the Create Stations API
        Then The response status code is 201, a unique alphanumeric stationId is generated, rank and source_type are of type "number"