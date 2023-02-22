# Cypress API Tests using Cucumber

## Set Up/Install

```
git clone
```

Install the dependencies on your CI server or local

```
npm install
```

## Construct - Feature/Test Organization

1. All Feature files must be created with the file name convention name.feature under the cypress/e2e foldern [example: cucumber.feature]
2. Create a corresponding folder under e2e that has the same name as the feature name above(without .feature) [example : cucumber]
3. Create/add your cypress spec/feature implementaion under this folder [example : /e2e/cucumber/cypressSpec.cy.js]
4. Create a <b>cypress.env.json</b> file to store your apiKey & update the apiKey like in the example below.
   Example :

```
{ "appid": "<your ApiKey goes here>" }
```

<b>NOTE</b>> : Let this env file be only local & gitignored. It is a best practice to generate this dynamicaly or store this as an env var in the CI server.

5. <b>cypress.config.js</b> has been pre created and udpated with the required config values for use(contains the API Endpoint URL, Reporting configuration)

### To add your own scenarios and tests

1. Edit the [feature file](cypress/e2e/cucumber.feature) and edit/add more API test scenarios using the Given, When, Then & And construct.
2. Add the matching tests to the [cucumber.js](cypress/e2e/cucumber/cucumber.js)

## API Key

The Open Weather use an API Key for Authentication.

To generate and use the apiKey in your tests :

1. Register online at [OpenWeather](https://home.openweathermap.org/api_keys) and generate an api key.

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
