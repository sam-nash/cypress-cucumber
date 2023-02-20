# Cypress API Tests using Cucumber

## Set Up/Install

```
git clone
```

Install the dependencies on your CI server or local

```
npm install
```

## API Key

The Open Weather use an API Key for Authentication.

To generate and use the apiKey in your tests :

1. Register online at [OpenWeather](https://home.openweathermap.org/api_keys) and generate an api key.
2. Create a <b>cypress.env.json</b> file at the root of your project and update the value to the key <b>appid</b> with the apiKey generated in Step 1.

Example :

```
{ "appid": "<your ApiKey goes here" }
```

## To add your own scenarios and tests

1. Edit the [feature file](cypress/e2e/apiTests.feature) and add more API test scenarios using the Given, When, Then & And construct.
2. Add the matching tests to the [apiTests.js](cypress/e2e/apiTests/apiTests.js)

## To run the tests

### All tests in the e2e and default folders

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
