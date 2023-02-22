# Cypress API Tests using Cucumber

## Set Up/Install
1. Clone the Repo

```
git clone
```

2. Install the dependencies on your CI server or local

```
npm install
```

3. Generate an API Key

The Open Weather use an API Key for Authentication.

To generate and use the apiKey in your tests :

1. Register online at [OpenWeather](https://home.openweathermap.org/api_keys) and generate an api key.


### Approaches
To demonstrate API Testing with Cypress, I have added tests that make use of 3 approaches as described below.

The first 2 make use of cucumber(below)

1. DATA TABLE - Feature is in the cucumber.feature file that has the test data in a tabular form & the cypress spec is in the e2e/cucumber/apiTest.js which has the implementation where the cypress spec loops through the data to POST and verifies the response code. It then also sends a GET request for each stationId to verify the data.

2. Without DATA TABLE - Feature is in the apiTests.feature & its implementation in the e2e/apiTests/apiTests.js. Here the scenarios have been separated for each POST Request(1 per each test data) and corresponding GET requests verify the data.

The ONLY intention to separate it this way is to demonstrate that an api request body can be added in the scenario's Given or When & ALSO the test report displays the scenarios separately. 

#### Construct - Feature/Test Organization
a. All Feature files must be created with the file name convention name.feature under the cypress/e2e foldern [example: cucumber.feature]
b. Create a corresponding folder under e2e that has the same name as the feature name above(without '.feature') [example : cucumber]
c. Create/add your cypress spec/feature implementaion under this folder [example : /e2e/cucumber/cypressSpec.cy.js]

##### To add your own scenarios and tests

1. Edit the [feature file](cypress/e2e/cucumber.feature) and edit/add more API test scenarios using the Given, When, Then & And construct.
2. Add the matching tests to the [cucumber.js](cypress/e2e/cucumber/cucumber.js)

The last is without cucumber

3. The spec for the API tests without using cucumber are in default/*.cy.js
   i. The spec (createAndGetStations.cy.js)[cypress/default/createAndGetStations.cy.js] reads different test data combinations from the fixture file (createStations.js)[cypress/fixtures/createStations.js] & makes a POST request to the api endpoint per each test data request & verifies the response from the api.
   Note : ...that in the fixture file, I have added an attribute called "TestCase" which is the scenario we are testing. This value gets printed on the console/test report so that the user knows what they are testing. 
   Before sending this request we destruct the Object to remove this "TestCase" attribute as the API wouldn't recognise the key.
   ii. It then extracts the stationId from the POST response and sends a GET request to the api with this 'stationId', verifies the GET response with the POST request that was sent earlier(again we desctruct some of the attributes from the GET response so that we can perform a deep equality of two objects.
   iii. You may add any other assertions you'd like to verify other values(ex: assert that the response contains all the keys you'd expect).


#### Secure your passwords/tokens
Create a <b>cypress.env.json</b> file to store your apiKey & update the apiKey like in the example below.
   Example :

```
{ "appid": "<your ApiKey goes here>" }
```

<b>NOTE</b> : Let this cypress.env.json file be local to your machine & gitignored. It is a best practice to generate this dynamically or store this as an env var in the CI server/read it from there.

#### Cypress Configuration
<b>cypress.config.js</b> has been pre created and updated with the required config values for use(contains the API Endpoint URL, Reporting configuration)

#### Cypress custom commands
As we might make use of cy.request() multiple times with different methods, I've created custom commands in (commands.js)[cypress/support/commands.js]
--This makes it user friendly(for users who dont want to be bothered too much about technical details of how to make requests).
--Better readability of code.


## To run the tests

### To run all the tests in the e2e and default folders

```
npx cypress run
```

### Specific Cucumber Tests

```
npm run cucumberTest
```

### The normal API Tests (not using Cucumber)

```
npm run defaultTest
```

## Test Reports

When the test run completes, the reports are saved in html format at the lcoation `cypress/reports/index.html`
A sample report has been atatched for reference.)
